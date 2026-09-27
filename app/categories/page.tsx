import { getCategoryProgressData } from "@/lib/queries";

export default async function CategoriesPage() {
  const data = await getCategoryProgressData();
  const hasCamoData = data.some((category) => category.total_count > 0);

  return (
    <div className="space-y-4">
      <section className="card">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">MW4 Categories</p>
        <h1 className="mt-1 text-2xl font-semibold text-white">Weapon class progress</h1>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          The beta weapon classes are loaded now. Weapon-specific launch camo challenges will populate these totals once officially confirmed.
        </p>
      </section>
      {!hasCamoData && (
        <div className="rounded-2xl border border-warning/20 bg-warning/[0.04] p-4 text-sm text-slate-300">
          No weapon-specific launch camo challenges have been published in Codhub yet. Your tracker is ready for the official data.
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((c) => (
          <div key={c.category_id} className="card">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{c.category_name}</h2>
              <span className="text-xs text-slate-500">{c.total_count} camos</span>
            </div>
            <p className="text-sm">{c.completed_count}/{c.total_count} completed</p>
            <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-success" style={{ width: `${c.completion_pct}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
