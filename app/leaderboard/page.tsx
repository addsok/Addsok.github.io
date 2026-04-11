import { createClient } from "@/lib/supabase/server";
import { getLeaderboardRows } from "@/lib/queries";

export default async function LeaderboardPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const platform = params.platform;
  const scope = params.scope || "all";

  const leaderboard = await getLeaderboardRows({ platform, userId: user?.id });

  let top = leaderboard.rows;
  if (scope === "friends" && user) {
    const { data: friends } = await supabase.from("friends").select("friend_user_id").eq("user_id", user.id);
    const friendIds = new Set((friends || []).map((f: { friend_user_id: string }) => f.friend_user_id));
    top = top.filter((row) => friendIds.has(row.user_id) || row.user_id === user.id);
  }

  return (
    <div className="space-y-4">
      <form className="card flex flex-wrap gap-2"><select className="input max-w-xs" name="platform" defaultValue={platform || ""}><option value="">All platforms</option><option>PC</option><option>PlayStation</option><option>Xbox</option></select><select className="input max-w-xs" name="scope" defaultValue={scope}><option value="all">All players</option><option value="friends">Friends</option></select><button className="btn">Filter</button></form>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="text-left text-accent"><th>#</th><th>Player</th><th>Platform</th><th>Completed</th><th>%</th><th>Mastery</th><th>Updated</th></tr></thead>
          <tbody>{top.map((r) => <tr key={r.user_id} className="border-t border-accent/20"><td>{r.rank_position}</td><td>{r.username}</td><td>{r.platform}</td><td>{r.completed_count}</td><td>{r.completion_pct}%</td><td>{r.mastery_count}</td><td>{new Date(r.last_updated).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </div>
      {leaderboard.me && (
        <div className="card">
          Your rank: <b>#{leaderboard.me.rank_position}</b> • {leaderboard.me.completed_count} camos • {leaderboard.me.completion_pct}%
        </div>
      )}
    </div>
  );
}
