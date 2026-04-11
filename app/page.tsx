import Link from "next/link";
import { ChevronRight, Crosshair, ShieldCheck, Trophy } from "lucide-react";

const stats = [
  { label: "Tracked Weapons", value: "50+", detail: "Across all BO7 categories" },
  { label: "Saved Progress", value: "Live", detail: "Secure profile-based sync" },
  { label: "Leaderboard", value: "Ranked", detail: "Compare completion pace" }
];

const features = [
  {
    title: "Precision Progress Logging",
    copy: "Update each camo stage with clear locked, in-progress, and complete states in a focused flow.",
    icon: ShieldCheck
  },
  {
    title: "Weapon Planning",
    copy: "Move through categories quickly with app-style cards optimized for long grind sessions.",
    icon: Crosshair
  },
  {
    title: "Competitive Momentum",
    copy: "Track your rank and keep pressure on your pace with leaderboard visibility.",
    icon: Trophy
  }
];

export default function HomePage() {
  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="card overflow-hidden p-0">
        <div className="space-y-6 p-5 sm:p-7 lg:p-9">
          <div className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            BO7 Tracker
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Track your BO7 camo grind</h1>
            <p className="section-copy">
              A clean mobile companion for tracking weapon progress, camo unlocks, and completion across every
              category.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/weapons" className="btn justify-between">
              Open BO7 Tracker
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/signup" className="btn-secondary justify-between">
              Join Codhub
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#14110d] p-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="card section-shell">
        <div>
          <h2 className="section-heading">Built for the Grind</h2>
          <p className="section-copy">Stacked sections, high-contrast readability, and premium card spacing tuned for mobile-first use.</p>
        </div>
        <div className="grid gap-3">
          {features.map(({ title, copy, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-[#14110d] p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
