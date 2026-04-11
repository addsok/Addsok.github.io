import Link from "next/link";
import { getDashboardData } from "@/lib/queries";

export default async function DashboardPage() {
  const data = await getDashboardData();
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="card"><p className="text-sm">Overall Completion</p><p className="text-3xl font-bold">{data.overallPct}%</p><p>{data.completed}/{data.total}</p></div>
        <div className="card"><p className="text-sm">Mastery Camos</p><p className="text-3xl font-bold">{data.mastery}</p></div>
        <div className="card"><p className="text-sm">Weapons Completed</p><p className="text-3xl font-bold">{data.weaponsCompleted}/{data.totalWeapons}</p></div>
        <div className="card"><p className="text-sm">Leaderboard Rank</p><p className="text-3xl font-bold">#{data.currentRank ?? "-"}</p></div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Recent Progress Activity</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.recent.map((r: any) => <li key={r.camo_id} className="rounded border border-cyan-500/20 p-2">{r.status} • {new Date(r.updated_at).toLocaleString()}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link className="btn-secondary" href="/weapons">Browse Weapons</Link>
            <Link className="btn-secondary" href="/categories">Category Breakdown</Link>
            <Link className="btn-secondary" href="/leaderboard">Global Leaderboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
