import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6 md:space-y-8">
      <div className="card overflow-hidden p-0">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-end lg:gap-10 lg:p-10">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Black Ops 7 Operations Hub
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Precision camo tracking built for serious BO7 grinders.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Monitor every unlock path, keep progress synced with secure auth, and measure your completion pace against the community leaderboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/weapons" className="btn">Enter Tracker</Link>
              <Link href="/signup" className="btn-secondary">Create Operator Profile</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mode</p>
              <p className="mt-2 text-lg font-semibold">Live Sync</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Data</p>
              <p className="mt-2 text-lg font-semibold">BO7 Ready</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</p>
              <p className="mt-2 text-lg font-semibold text-accent">Mission Active</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tracking</p>
              <p className="mt-2 text-lg font-semibold">Per Camo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="card">
          <h2 className="text-base font-semibold uppercase tracking-[0.14em] text-slate-200">Authenticated Progress</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Save each camo state as locked, in progress, or completed with account-backed synchronization.</p>
        </article>
        <article className="card">
          <h2 className="text-base font-semibold uppercase tracking-[0.14em] text-slate-200">Clean Weapon Matrix</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Browse BO7 weapon categories and camo challenges without clutter or distracting visual noise.</p>
        </article>
        <article className="card">
          <h2 className="text-base font-semibold uppercase tracking-[0.14em] text-slate-200">Competitive Leaderboard</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Track completion standings and compare your camo grind efficiency across registered operators.</p>
        </article>
      </div>
    </section>
  );
}
