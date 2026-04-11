import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusSelect } from "@/components/weapons/status-select";

export default async function WeaponDetailPage({ params }: { params: Promise<{ weaponId: string }> }) {
  const { weaponId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: weapon }, { data: camos }, { data: progress }] = await Promise.all([
    supabase.from("weapons").select("*,weapon_categories(name)").eq("id", weaponId).single(),
    supabase.from("camos").select("id,name,camo_groups(name,type),camo_requirements(requirement_text)").eq("weapon_id", weaponId).order("unlock_order"),
    supabase.from("user_camo_progress").select("camo_id,status").eq("user_id", user.id)
  ]);

  if (!weapon) notFound();
  const map = new Map((progress ?? []).map((p) => [p.camo_id, p.status]));

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-3xl font-bold">{weapon.name}</h1>
        <p className="text-gray-300">{weapon.weapon_categories?.name} {weapon.level_unlock ? `• Unlock: ${weapon.level_unlock}` : ""}</p>
      </div>
      <div className="space-y-3">
        {camos?.map((c: any) => (
          <div key={c.id} className="card grid gap-2 md:grid-cols-3 md:items-center">
            <div><p className="font-semibold">{c.name}</p><p className="text-xs uppercase text-accent">{c.camo_groups?.type}</p></div>
            <p className="text-sm text-gray-300">{c.camo_requirements?.[0]?.requirement_text}</p>
            <StatusSelect camoId={c.id} current={map.get(c.id) ?? "locked"} />
          </div>
        ))}
      </div>
    </div>
  );
}
