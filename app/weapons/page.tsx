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

const orderedCategories = [
  { slug: "assault-rifles", name: "Assault Rifles" },
  { slug: "smgs", name: "SMGs" },
  { slug: "shotguns", name: "Shotguns" },
  { slug: "lmgs", name: "LMGs" },
  { slug: "marksman-rifles", name: "Marksman Rifles" },
  { slug: "sniper-rifles", name: "Sniper Rifles" },
  { slug: "pistols", name: "Pistols" },
  { slug: "launchers", name: "Launchers" },
  { slug: "melee", name: "Melee" }
] as const;

const orderedCategorySlugs = new Set<string>(orderedCategories.map((category) => category.slug));

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
    const existing = acc.get(weapon.category_slug) ?? [];
    existing.push(weapon);
    acc.set(weapon.category_slug, existing);
    return acc;
  }, new Map());

  const visibleCategories = orderedCategories
    .map((category) => ({ ...category, weapons: groupedWeapons.get(category.slug) ?? [] }))
    .filter((category) => category.weapons.length > 0);

  const uncategorizedCount = weapons.filter((weapon) => !orderedCategorySlugs.has(weapon.category_slug)).length;

  return (
    <div className="space-y-3 sm:space-y-4">
      <form className="card grid grid-cols-2 gap-2 p-2.5 sm:grid-cols-4 sm:p-3">
        <input className="input col-span-2 py-2" name="search" placeholder="Search weapon" defaultValue={params.search} />
        <select className="input py-2" name="category" defaultValue={params.category || ""}>
          <option value="">All categories</option>
          {orderedCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <select className="input py-2" name="status" defaultValue={params.status || ""}>
          <option value="">Any status</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
        </select>
        <select className="input py-2" name="sort" defaultValue={params.sort || "az"}>
          <option value="az">A-Z</option>
          <option value="most_completed">Most Completed</option>
          <option value="least_completed">Least Completed</option>
          <option value="newest">Newest Weapon</option>
        </select>
        <button className="btn py-2 sm:col-span-4">Apply Filters</button>
      </form>

      {!!uncategorizedCount && (
        <p className="text-xs text-slate-500">{uncategorizedCount} weapon(s) are hidden due to category mapping.</p>
      )}

      <div className="space-y-4">
        {visibleCategories.map((category) => (
          <section key={category.slug} className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent/95">{category.name}</h2>
              <p className="text-[11px] text-slate-400">{category.weapons.length}</p>
            </div>

            <div className="grid gap-2.5">
              {category.weapons.map((weapon) => (
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
