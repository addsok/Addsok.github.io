import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, LockKeyhole } from "lucide-react";
import { StatusSelect } from "@/components/weapons/status-select";
import { getWeaponDetailData } from "@/lib/queries";

export default async function WeaponDetailPage({ params }: { params: Promise<{ weaponId: string }> }) {
  const { weaponId } = await params;
  const data = await getWeaponDetailData(weaponId);

  if (!data) notFound();

  const completed = data.camos.filter((camo) => data.progressMap.get(camo.id) === "completed").length;
  const pct = data.camos.length ? Math.round((completed / data.camos.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <Link href="/weapons" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-accent">
        <ChevronLeft className="h-3.5 w-3.5" /> Back to Arsenal
      </Link>

      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b100e] p-5 shadow-[0_24px_65px_rgba(0,0,0,0.65)] sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(168,185,107,0.12),transparent_34%)]" />
        <div className="relative">
          <p className="mw4-label">{data.category?.name ?? "Weapon"} // MW4</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[-0.03em] sm:text-5xl">{data.weapon.name}</h1>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                {data.weapon.levelUnlock ? "Unlock: " + data.weapon.levelUnlock : "Weapon"}
              </p>
            </div>
            <div className="min-w-[190px] rounded-xl border border-white/10 bg-black/25 p-3">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.12em]">
                <span className="text-slate-500">Camo progress</span>
                <span className="text-accent">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1.5 text-[10px] text-slate-500">{completed} / {data.camos.length} completed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="mw4-label">Camo progression</p>
            <h2 className="mt-1 text-xl font-bold uppercase">All camos</h2>
          </div>
          {!data.isLoggedIn && <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Sign in to save</span>}
        </div>

        <div className="mt-4 space-y-2">
          {data.camos.map((camo) => (
            <div key={camo.id} className="grid gap-3 rounded-xl border border-white/10 bg-[#0b100e] p-3 md:grid-cols-[1fr_1.5fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold uppercase tracking-[0.05em] text-white">{camo.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-accent">
                  {camo.groupType === "mastery" && <LockKeyhole className="h-3 w-3" />}
                  {camo.groupType}
                </p>
              </div>
              <p className="text-xs leading-5 text-slate-400">{camo.requirement}</p>
              {data.isLoggedIn ? (
                <StatusSelect camoId={camo.id} current={data.progressMap.get(camo.id) ?? "locked"} />
              ) : (
                <div className="text-xs text-slate-500">Track after <Link href="/login" className="font-semibold text-accent hover:underline">logging in</Link>.</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
