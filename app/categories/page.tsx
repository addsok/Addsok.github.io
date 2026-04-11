import { getCategoryProgressData } from "@/lib/queries";

export default async function CategoriesPage() {
  const data = await getCategoryProgressData();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.map((c) => (
        <div key={c.category_id} className="card">
          <h2 className="text-xl font-semibold">{c.category_name}</h2>
          <p className="text-sm">{c.completed_count}/{c.total_count} completed</p>
          <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-success" style={{ width: `${c.completion_pct}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
