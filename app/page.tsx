import Link from "next/link";
import { Activity, Crosshair, ShieldCheck, Trophy } from "lucide-react";

const stats = [
  { label: "Tracked weapons", value: "50+", detail: "Across all BO7 categories" },
  { label: "Saved progress", value: "Live", detail: "Synced securely to your profile" },
  { label: "Leaderboard mode", value: "Ranked", detail: "Compare completion with operators" }
];

const features = [
  {
    title: "Precision Progress Logging",
    copy: "Update each camo stage with clear locked, in-progress, and complete statuses in a focused dashboard flow.",
    icon: ShieldCheck
  },
  {
    title: "Weapon-by-Weapon Planning",
    copy: "Navigate categories quickly with layered cards designed for long sessions and clean tactical readability.",
    icon: Crosshair
  },
  {
    title: "Competitive Momentum",
    copy: "Monitor pace and completion standing with a leaderboard section that keeps your grind accountable.",
    icon: Trophy
  }
];

export default function HomePage() {
  return (
    <section className="space-y-12 sm:space-y-14">
      <div className="card overflow-hidden p-0">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-center lg:gap-12 lg:p-12">
          <div className="section-shell">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <Activity className="h-3.5 w-3.5" />
              Premium BO7 Companion
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Track your camo grind with the clarity of a modern competitive app.
            </h1>
            <p className="section-copy">
              Built for serious players who want polished workflows, streamlined progress control, and reliable profile-based save sync in one dark, focused workspace.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/weapons" className="btn">Open Tracker</Link>
              <Link href="/signup" className="btn-secondary">Create Profile</Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Live Session Snapshot</p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-panel/80 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Sync</p>
                <p className="mt-2 font-semibold text-white">Authenticated & Persistent</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-panel/80 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Environment</p>
                <p className="mt-2 font-semibold text-white">Mobile-First Tactical Layout</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-panel/80 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Focus</p>
                <p className="mt-2 font-semibold text-accent">Clean, Premium, Competitive</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell">
        <div>
          <h2 className="section-heading">Operational Stats</h2>
          <p className="section-copy">Everything you need at a glance, surfaced in refined dark cards with restrained visual accents.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="card space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div>
          <h2 className="section-heading">Built for the Grind</h2>
          <p className="section-copy">Purposeful UI components designed to feel like a polished gaming companion product, not a generic website.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {features.map(({ title, copy, icon: Icon }) => (
            <article key={title} className="card space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-7 text-slate-400">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
