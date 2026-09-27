import Link from "next/link";
import { ChevronRight, Crosshair, ShieldCheck, Trophy } from "lucide-react";

const stats = [
  { label: "Beta Weapons", value: "22", detail: "Across 9 weapon classes" },
  { label: "Universal Camos", value: "2", detail: "Confirmed for launch" },
  { label: "Launch Arsenal", value: "33", detail: "Official launch total" }
];

const features = [
  { title: "Arsenal", copy: "Browse every verified MW4 beta weapon and keep your camo progress in one place.", icon: Crosshair },
  { title: "Universal Camos", copy: "Track confirmed universal camos without filling the tracker with unverified challenge data.", icon: ShieldCheck },
  { title: "Your Progress", copy: "Sign in to save completed camos and keep your grind organised across Codhub.", icon: Trophy }
];

export default function HomePage() {
  return (
    <section className="space-y-5 sm:space-y-7">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b100e] shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(168,185,107,0.14),transparent_30%),linear-gradient(115deg,rgba(255,255,255,0.025),transparent_48%)]" />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_18px,rgba(168,185,107,0.22)_19px,transparent_20px)]" />
        <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="mw4-label">Codhub // Modern Warfare 4</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Track. Unlock. <span className="text-accent">Complete.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              The MW4 camo tracker for your weapon grind. The verified beta arsenal is loaded now, with official launch data added as it is confirmed.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href="/weapons" className="btn">Open Arsenal <ChevronRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/signup" className="btn-secondary">Create Account</Link>
            </div>
          </div>

          <div className="grid gap-2 self-end sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
                <p className="mw4-label">{stat.label}</p>
                <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {features.map(({ title, copy, icon: Icon }) => (
          <article key={title} className="mw4-panel rounded-2xl p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mw4-label">Data status</p>
            <h2 className="mt-1 section-heading">MW4 beta arsenal loaded</h2>
          </div>
          <span className="rounded-md border border-accent/25 bg-accent/5 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-accent">
            Launch data pending
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
          The 22-weapon beta roster is loaded. Weapon-specific launch camo challenges are kept out of the tracker until the official challenge data is confirmed.
        </p>
      </section>
    </section>
  );
}
