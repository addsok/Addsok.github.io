import { createClient } from "@/lib/supabase/server";
import { pct } from "@/lib/utils";

export async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: progress }, { data: camos }, { data: weapons }, { data: rankRow }] = await Promise.all([
    supabase.from("user_camo_progress").select("status,camo_id,updated_at,camos(weapon_id,camo_groups(type))").eq("user_id", user.id),
    supabase.from("camos").select("id"),
    supabase.from("weapons").select("id,name"),
    supabase.rpc("get_user_rank", { p_user_id: user.id }).single()
  ]);

  const completed = progress?.filter((p) => p.status === "completed").length ?? 0;
  const total = camos?.length ?? 0;
  const mastery = progress?.filter((p: any) => p.status === "completed" && p.camos?.camo_groups?.type === "mastery").length ?? 0;

  const completedWeapons = new Set(progress?.filter((p: any) => p.status === "completed").map((p: any) => p.camos?.weapon_id));

  const recent = (progress ?? []).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 8);

  return {
    completed,
    total,
    overallPct: pct(completed, total),
    mastery,
    weaponsCompleted: completedWeapons.size,
    currentRank: rankRow?.rank_position ?? null,
    recent,
    totalWeapons: weapons?.length ?? 0
  };
}

export async function getWeaponsWithProgress(filters: { category?: string; search?: string; sort?: string; status?: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  let q = supabase.from("weapon_progress_summary").select("*").eq("user_id", user.id);
  if (filters.category) q = q.eq("category_slug", filters.category);
  if (filters.search) q = q.ilike("weapon_name", `%${filters.search}%`);
  if (filters.status === "completed") q = q.eq("completion_pct", 100);
  if (filters.status === "in_progress") q = q.gt("completed_count", 0).lt("completion_pct", 100);

  const orderMap: Record<string, string> = { az: "weapon_name", most_completed: "completion_pct", least_completed: "completion_pct", newest: "release_order" };
  q = q.order(orderMap[filters.sort || "az"] || "weapon_name", { ascending: filters.sort !== "most_completed" });

  const { data } = await q;
  return data ?? [];
}
