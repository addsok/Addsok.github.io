"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { setProgressAction } from "@/lib/actions";

type Tile = {
  id: string;
  name: string;
  groupType: "base" | "special" | "mastery";
};

type Status = "locked" | "in_progress" | "completed";

type WeaponCardProps = {
  weapon: {
    weapon_id: string;
    weapon_name: string;
    category_name: string;
    completed_count: number;
    total_count: number;
    completion_pct: number;
    preview_tiles: Tile[];
    mastery_tile: Tile | null;
    progress_map: Record<string, Status>;
  };
  isNew: boolean;
  isLoggedIn: boolean;
};

const tileBaseClass =
  "group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[9px] font-semibold uppercase tracking-[0.14em] transition sm:h-9 sm:w-9";

export function WeaponCard({ weapon, isNew, isLoggedIn }: WeaponCardProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [progressMap, setProgressMap] = useState<Record<string, Status>>(weapon.progress_map);

  const masteryStatus = weapon.mastery_tile ? progressMap[weapon.mastery_tile.id] ?? "locked" : "locked";

  const completedCount = useMemo(() => {
    const allIds = [...weapon.preview_tiles.map((t) => t.id), weapon.mastery_tile?.id].filter(Boolean) as string[];
    return allIds.reduce((acc, id) => acc + (progressMap[id] === "completed" ? 1 : 0), 0);
  }, [progressMap, weapon.mastery_tile?.id, weapon.preview_tiles]);

  const previewTotal = weapon.preview_tiles.length + (weapon.mastery_tile ? 1 : 0);
  const cardPct = previewTotal > 0 ? Math.round((completedCount / previewTotal) * 100) : weapon.completion_pct;

  const toggleTile = (tile: Tile) => {
    if (!isLoggedIn || pending) return;
    const current = progressMap[tile.id] ?? "locked";
    const next: Status = current === "completed" ? "locked" : "completed";

    setProgressMap((prev) => ({ ...prev, [tile.id]: next }));

    start(async () => {
      const res = await setProgressAction(tile.id, next);
      if (res?.error) {
        setProgressMap((prev) => ({ ...prev, [tile.id]: current }));
        toast.error(res.error);
        return;
      }
      toast.success(next === "completed" ? `${tile.name} completed` : `${tile.name} reset`);
      router.refresh();
    });
  };

  const tileClass = (status: Status) => {
    if (status === "completed") {
      return "border-warning/70 bg-gradient-to-b from-warning/35 to-warning/15 text-warning shadow-[0_0_16px_rgba(245,158,11,0.35)]";
    }
    if (status === "in_progress") {
      return "border-accent/50 bg-accent/20 text-accent";
    }
    return "border-white/10 bg-white/[0.04] text-slate-500 hover:border-accent/40 hover:text-accent/80";
  };

  return (
    <article className="rounded-2xl border border-white/10 bg-panel/95 px-4 py-3 shadow-glow sm:px-4 sm:py-3.5">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                {weapon.category_name}
              </span>
              {isNew && (
                <span className="rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-warning">
                  New
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold leading-tight text-white">{weapon.weapon_name}</h3>
            <p className="mt-1 text-xs text-slate-400">
              {weapon.completed_count}/{weapon.total_count} completed
            </p>
          </div>

          <Link
            href={`/weapons/${weapon.weapon_id}`}
            className="inline-flex h-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-accent/50 hover:text-accent"
          >
            Open
          </Link>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Progress</span>
            <span className="font-semibold text-accent">{cardPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-accentMuted via-accent to-warning"
              style={{ width: `${cardPct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          {weapon.preview_tiles.map((tile) => {
            const status = progressMap[tile.id] ?? "locked";
            return (
              <button
                key={tile.id}
                type="button"
                aria-label={`Toggle ${tile.name}`}
                title={`${tile.name} (${status})`}
                disabled={!isLoggedIn || pending}
                onClick={() => toggleTile(tile)}
                className={`${tileBaseClass} ${tileClass(status)} ${!isLoggedIn ? "cursor-not-allowed opacity-70" : "active:scale-95"}`}
              >
                <span className="sr-only">{tile.name}</span>
                {status === "completed" ? "✓" : ""}
              </button>
            );
          })}

          {weapon.mastery_tile && (
            <button
              type="button"
              aria-label={`Toggle ${weapon.mastery_tile.name}`}
              title={`${weapon.mastery_tile.name} (${masteryStatus})`}
              disabled={!isLoggedIn || pending}
              onClick={() => toggleTile(weapon.mastery_tile as Tile)}
              className={`ml-1 flex h-9 min-w-14 shrink-0 items-center justify-center rounded-xl border px-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition sm:h-10 ${
                tileClass(masteryStatus)
              } ${!isLoggedIn ? "cursor-not-allowed opacity-70" : "active:scale-[0.98]"}`}
            >
              {masteryStatus === "completed" ? "Mastery ✓" : "Mastery"}
            </button>
          )}
        </div>

        {!isLoggedIn && (
          <p className="text-[11px] text-slate-400">
            <Link href="/login" className="text-accent hover:underline">
              Log in
            </Link>{" "}
            to update camo progress from this card.
          </p>
        )}
      </div>
    </article>
  );
}
