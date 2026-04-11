import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="card p-8">
        <h1 className="text-4xl font-extrabold">BO7 Camo Tracker</h1>
        <p className="mt-4 text-gray-300">Track Black Ops 7 camo progression with secure Supabase auth and progress sync, while shared BO7 content is served directly from app code.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/weapons" className="btn">Browse Tracker</Link>
          <Link href="/signup" className="btn-secondary">Create Account</Link>
        </div>
      </div>
      <div className="card p-8">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-300">
          <li>Browse all BO7 weapons and camos without logging in</li>
          <li>Save per-camo states (locked, in progress, completed) after login</li>
          <li>Leaderboard based on Supabase profiles + progress data</li>
          <li>No admin seed/import required for shared BO7 content</li>
        </ul>
      </div>
    </section>
  );
}
