import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("leaderboard_public").select("*").eq("username", username).single();
  if (!row) notFound();
  return <div className="card max-w-2xl"><h1 className="text-3xl font-bold">{row.username}</h1><p>{row.platform}</p><p>{row.completed_count} completed • {row.completion_pct}%</p></div>;
}
