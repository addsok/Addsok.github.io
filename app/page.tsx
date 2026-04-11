import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="card p-8">
        <h1 className="text-4xl font-extrabold">BO7 Camo Tracker</h1>
        <p className="mt-4 text-gray-300">A production-grade camo progression tracker with secure auth, profile management, and a validated leaderboard powered by Supabase.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/signup" className="btn">Create Account</Link>
          <Link href="/login" className="btn-secondary">Login</Link>
        </div>
      </div>
      <div className="card p-8">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-300">
          <li>Per-weapon camo states (locked, in progress, completed)</li>
          <li>Auto-calculated overall + category completion</li>
          <li>Global top 100 leaderboard + your exact rank</li>
          <li>Season-ready BO7 data import and seed pipeline</li>
        </ul>
      </div>
    </section>
  );
}
