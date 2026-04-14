import Link from "next/link";
import { getWeaponsWithProgress } from "@/lib/queries";

type WeaponRow = {
  weapon_id: string;
  weapon_name: string;
  category_name: string;
  category_slug: string;
  completed_count: number;
  total_count: number;
  completion_pct: number;
  release_order: number;
};

export default async function WeaponsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const weapons = (await getWeaponsWithProgress(params)) as WeaponRow[];

  const newWeaponIds = new Set(
    [...weapons]
      .sort((a, b) => b.release_order - a.release_order)
      .slice(0, 4)
      .map((weapon) => weapon.weapon_id)
  );

  const groupedWeapons = weapons.reduce<Map<string, WeaponRow[]>>((acc, weapon) => {
    const existing = acc.get(weapon.category_name) ?? [];
    existing.push(weapon);
    acc.set(weapon.category_name, existing);
    return acc;
  }, new Map());

  return (
    <div className="space-y-5 sm:space-y-6">
      <form className="card grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input className="input" name="search" placeholder="Search weapon" defaultValue={params.search} />
        <input className="input" name="category" placeholder="Category slug" defaultValue={params.category} />
        <select className="input" name="status" defaultValue={params.status || ""}>
          <option value="">Any status</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
        </select>
        <select className="input" name="sort" defaultValue={params.sort || "az"}>
          <option value="az">A-Z</option>
          <option value="most_completed">Most Completed</option>
          <option value="least_completed">Least Completed</option>
          <option value="newest">Newest Weapon</option>
        </select>
        <button className="btn sm:col-span-2 lg:col-span-1">Apply</button>
      </form>

      <div className="space-y-6">
        {[...groupedWeapons.entries()].map(([categoryName, categoryWeapons]) => (
          <section key={categoryName} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold uppercase tracking-[0.18em] text-accent/90">{categoryName}</h2>
              <p className="text-xs text-slate-400">{categoryWeapons.length} weapons</p>
            </div>

            <div className="grid gap-4">
              {categoryWeapons.map((weapon) => {
                const miniTileCount = Math.min(6, Math.max(4, Math.ceil(weapon.total_count / 2)));
                const completedMiniTiles = Math.round((weapon.completion_pct / 100) * miniTileCount);
                const masteryComplete = weapon.completion_pct === 100;

                return (
                  <article
                    key={weapon.weapon_id}
                    className="rounded-3xl border border-white/10 bg-panel/95 p-4 shadow-glow sm:p-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                              {weapon.category_name}
                            </span>
                            {newWeaponIds.has(weapon.weapon_id) && (
                              <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-warning">
                                New
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold leading-tight">{weapon.weapon_name}</h3>
                          <p className="mt-1 text-xs text-slate-400">
                            {weapon.completed_count}/{weapon.total_count} camos completed
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Favourite ${weapon.weapon_name}`}
                          className="rounded-full border border-white/15 bg-white/5 p-2 text-sm text-warning transition hover:border-warning/50 hover:bg-warning/10"
                        >
                          ★
                        </button>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#14110d] p-4">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="font-semibold text-accent">{weapon.completion_pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-accentMuted via-accent to-warning"
                            style={{ width: `${weapon.completion_pct}%` }}
                          />
                        </div>

                        <div className="mt-4 grid grid-cols-[1.2fr_auto] gap-3">
                          <div className="flex min-h-20 items-end rounded-2xl border border-white/10 bg-gradient-to-br from-[#2b2217] to-[#18120d] p-3">
                            <span className="text-lg font-semibold text-white/90">{weapon.weapon_name.slice(0, 2).toUpperCase()}</span>
                          </div>

                          <Link
                            href={`/weapons/${weapon.weapon_id}`}
                            className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent transition hover:bg-accent/20"
                          >
                            Details
                          </Link>
                        </div>

                        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
                          {Array.from({ length: miniTileCount }).map((_, index) => (
                            <span
                              key={`${weapon.weapon_id}-tile-${index}`}
                              className={`h-7 w-7 shrink-0 rounded-lg border ${
                                index < completedMiniTiles
                                  ? "border-accent/50 bg-accent/25"
                                  : "border-white/10 bg-white/5"
                              }`}
                            />
                          ))}
                          <span
                            className={`ml-1 flex h-10 w-12 shrink-0 items-center justify-center rounded-xl border text-[10px] font-semibold uppercase tracking-[0.12em] ${
                              masteryComplete
                                ? "border-success/50 bg-success/20 text-success"
                                : "border-white/20 bg-white/10 text-slate-300"
                            }`}
                          >
                            Mastery
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
