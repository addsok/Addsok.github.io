import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusSelect } from "@/components/weapons/status-select";
import { getWeaponDetailData } from "@/lib/queries";

export default async function WeaponDetailPage({ params }: { params: Promise<{ weaponId: string }> }) {
  const { weaponId } = await params;
  const data = await getWeaponDetailData(weaponId);

  if (!data) notFound();

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-3xl font-bold">{data.weapon.name}</h1>
        <p className="text-gray-300">{data.category?.name} {data.weapon.levelUnlock ? `• Unlock: ${data.weapon.levelUnlock}` : ""}</p>
      </div>
      <div className="space-y-3">
        {data.camos.map((c) => (
          <div key={c.id} className="card grid gap-2 md:grid-cols-3 md:items-center">
            <div><p className="font-semibold">{c.name}</p><p className="text-xs uppercase text-accent">{c.groupType}</p></div>
            <p className="text-sm text-gray-300">{c.requirement}</p>
            {data.isLoggedIn ? (
              <StatusSelect camoId={c.id} current={data.progressMap.get(c.id) ?? "locked"} />
            ) : (
              <div className="text-sm text-gray-300">Track progress after <Link href="/login" className="text-accent">logging in</Link>.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
