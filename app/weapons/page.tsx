import { getWeaponsWithProgress } from "@/lib/queries";
import { WeaponCard } from "@/components/weapons/weapon-card";

type WeaponRow = {
  weapon_id: string;
  weapon_name: string;
  category_name: string;
  category_slug: string;
  level_unlock: string;
  completed_count: number;
  total_count: number;
  completion_pct: number;
  release_order: number;
  preview_tiles: { id: string; name: string; groupType: "base" | "special" | "mastery" }[];
  mastery_tile: { id: string; name: string; groupType: "mastery" } | null;
  camo_list: {
    id: string;
    name: string;
    groupType: "base" | "special" | "mastery";
    requirement: string;
    unlock_order: number;
  }[];
  progress_map: Record<string, "locked" | "in_progress" | "completed">;
};

export default async function WeaponsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const data = await getWeaponsWithProgress(params);
  const weapons = data.rows as WeaponRow[];

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
    <div className="space-y-4 sm:space-y-5">
      <form className="card grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-4 sm:p-4">
        <input className="input py-2.5" name="search" placeholder="Search weapon" defaultValue={params.search} />
        <input className="input py-2.5" name="category" placeholder="Category slug" defaultValue={params.category} />
        <select className="input py-2.5" name="status" defaultValue={params.status || ""}>
          <option value="">Any status</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
        </select>
        <select className="input py-2.5" name="sort" defaultValue={params.sort || "az"}>
          <option value="az">A-Z</option>
          <option value="most_completed">Most Completed</option>
          <option value="least_completed">Least Completed</option>
          <option value="newest">Newest Weapon</option>
        </select>
        <button className="btn py-2.5 sm:col-span-2 lg:col-span-4">Apply Filters</button>
      </form>

      <div className="space-y-5">
        {[...groupedWeapons.entries()].map(([categoryName, categoryWeapons]) => (
          <section key={categoryName} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold uppercase tracking-[0.18em] text-accent/90">{categoryName}</h2>
              <p className="text-xs text-slate-400">{categoryWeapons.length} weapons</p>
            </div>

            <div className="grid gap-3">
              {categoryWeapons.map((weapon) => (
                <WeaponCard
                  key={weapon.weapon_id}
                  weapon={weapon}
                  isNew={newWeaponIds.has(weapon.weapon_id)}
                  isLoggedIn={data.isLoggedIn}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
