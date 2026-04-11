import Link from "next/link";
import { getWeaponsWithProgress } from "@/lib/queries";

export default async function WeaponsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const weapons = await getWeaponsWithProgress(params);

  return (
    <div className="space-y-4">
      <form className="card grid gap-3 md:grid-cols-5">
        <input className="input" name="search" placeholder="Search weapon" defaultValue={params.search} />
        <input className="input" name="category" placeholder="Category slug" defaultValue={params.category} />
        <select className="input" name="status" defaultValue={params.status || ""}><option value="">Any status</option><option value="completed">Completed</option><option value="in_progress">In Progress</option></select>
        <select className="input" name="sort" defaultValue={params.sort || "az"}><option value="az">A-Z</option><option value="most_completed">Most Completed</option><option value="least_completed">Least Completed</option><option value="newest">Newest Weapon</option></select>
        <button className="btn">Apply</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {weapons.map((w: any) => (
          <Link href={`/weapons/${w.weapon_id}`} key={w.weapon_id} className="card block">
            <h3 className="text-xl font-semibold">{w.weapon_name}</h3>
            <p className="text-sm text-gray-300">{w.category_name} • {w.completed_count}/{w.total_count}</p>
            <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-accent" style={{ width: `${w.completion_pct}%` }} /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
