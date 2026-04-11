import { notFound } from "next/navigation";
import { getLeaderboardRows } from "@/lib/queries";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { rows } = await getLeaderboardRows();
  const row = rows.find((entry) => entry.username === username);
  if (!row) notFound();

  return <div className="card max-w-2xl"><h1 className="text-3xl font-bold">{row.username}</h1><p>{row.platform}</p><p>{row.completed_count} completed • {row.completion_pct}%</p><p>Rank #{row.rank_position}</p></div>;
}
