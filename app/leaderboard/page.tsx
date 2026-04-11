import { createClient } from "@/lib/supabase/server";

export default async function LeaderboardPage({ searchParams }: { searchParams: Promise<Record<string,string>> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const platform = params.platform;
  const scope = params.scope || "all";

  let q = supabase.from("leaderboard_public").select("*").order("completed_count", { ascending: false }).order("completion_pct", { ascending: false }).limit(100);
  if (platform) q = q.eq("platform", platform);
  const { data: baseRows } = await q;

  let top = baseRows || [];
  if (scope === "friends" && user) {
    const { data: friends } = await supabase.from("friends").select("friend_user_id").eq("user_id", user.id);
    const friendIds = new Set((friends || []).map((f: any) => f.friend_user_id));
    top = top.filter((r: any) => friendIds.has(r.user_id) || r.user_id === user.id);
  }

  const { data: me } = user ? await supabase.rpc("get_user_rank", { p_user_id: user.id }).single() : { data: null };

  return (
    <div className="space-y-4">
      <form className="card flex flex-wrap gap-2"><select className="input max-w-xs" name="platform" defaultValue={platform || ""}><option value="">All platforms</option><option>PC</option><option>PlayStation</option><option>Xbox</option></select><select className="input max-w-xs" name="scope" defaultValue={scope}><option value="all">All players</option><option value="friends">Friends</option></select><button className="btn">Filter</button></form>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="text-left text-accent"><th>#</th><th>Player</th><th>Platform</th><th>Completed</th><th>%</th><th>Mastery</th><th>Updated</th></tr></thead>
          <tbody>{top?.map((r: any, i: number) => <tr key={r.user_id} className="border-t border-cyan-300/10"><td>{i+1}</td><td>{r.username}</td><td>{r.platform}</td><td>{r.completed_count}</td><td>{r.completion_pct}%</td><td>{r.mastery_count}</td><td>{new Date(r.last_updated).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </div>
      {me && <div className="card">Your rank: <b>#{me.rank_position}</b> • {me.completed_count} camos • {me.completion_pct}%</div>}
    </div>
  );
}
