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

type CamoDetail = Tile & {
  requirement: string;
  unlock_order: number;
};

type Status = "locked" | "in_progress" | "completed";

type WeaponCardProps = {
  weapon: {
    weapon_id: string;
    weapon_name: string;
    category_name: string;
    category_slug: string;
    level_unlock: string;
    completed_count: number;
    total_count: number;
    completion_pct: number;
    preview_tiles: Tile[];
    mastery_tile: Tile | null;
    camo_list: CamoDetail[];
    progress_map: Record<string, Status>;
  };
  isNew: boolean;
  isLoggedIn: boolean;
};

const tileBaseClass =
  "group relative flex h-12 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border text-[10px] font-semibold uppercase tracking-[0.14em] transition";

const silhouettePathByCategory: Record<string, string> = {
  "assault-rifles": "M3 19h6l6-4h10l4 2h8v2h-8l-4 2H15l-6-4H3z",
  smgs: "M4 18h9l4-3h9l3 2h5v2h-5l-3 3h-4l-2 3h-3l1-3h-5l-5-4H4z",
  shotguns: "M3 18h10l5-3h15v2H19l-5 3H3z",
  lmgs: "M3 18h10l7-4h11l4 2h4v2h-5l-3 2h-8l-2 3h-4l1-3h-5l-6-2H3z",
  "marksman-rifles": "M3 18h8l8-4h12v2H20l-8 4H3z",
  "sniper-rifles": "M2 18h9l9-5h12v2H21l-9 5H2z",
  pistols: "M10 9h10v7h4v2h-6l-2 7h-3v-7h-3z",
  launchers: "M2 16h23v3H2z",
  special: "M5 17h6l4-3h7l4 3h5v2h-5l-4 3h-7l-4-3H5z",
  melee: "M16 4l2 2-8 8-2-2zM8 14l6 6 2-2-6-6z"
};

function camoStyle(seed: string, group: Tile["groupType"]) {
  const hash = [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = hash % 360;
  const sat = group === "mastery" ? 82 : group === "special" ? 68 : 40;
  const lightA = group === "mastery" ? 58 : 44;
  const lightB = group === "mastery" ? 38 : 22;

  return {
    backgroundImage: `
      linear-gradient(140deg, hsla(${hue}, ${sat}%, ${lightA}%, 0.85), hsla(${(hue + 32) % 360}, ${sat}%, ${lightB}%, 0.9)),
      radial-gradient(circle at 22% 25%, rgba(255,255,255,0.32) 0 8%, transparent 18%),
      repeating-linear-gradient(130deg, rgba(0,0,0,0.14) 0 6px, rgba(255,255,255,0.05) 6px 12px)
    `
  };
}

export function WeaponCard({ weapon, isNew, isLoggedIn }: WeaponCardProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [isExpanded, setExpanded] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, Status>>(weapon.progress_map);

  const camoCount = weapon.camo_list.length;
  const completedCount = useMemo(
    () => weapon.camo_list.reduce((acc, camo) => acc + (progressMap[camo.id] === "completed" ? 1 : 0), 0),
    [progressMap, weapon.camo_list]
  );

  const cardPct = camoCount > 0 ? Math.round((completedCount / camoCount) * 100) : weapon.completion_pct;

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

  const silhouettePath = silhouettePathByCategory[weapon.category_slug] ?? silhouettePathByCategory["assault-rifles"];

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-panel/95 p-3 shadow-glow sm:p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                {weapon.category_name}
              </span>
              <span className="rounded-full border border-white/15 bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                {weapon.level_unlock}
              </span>
              {isNew && (
                <span className="rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-warning">
                  New
                </span>
              )}
            </div>
            <h3 className="truncate text-base font-semibold leading-tight text-white">{weapon.weapon_name}</h3>
            <p className="mt-1 text-xs text-slate-400">
              {completedCount}/{weapon.total_count} camos complete
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <svg
              viewBox="0 0 40 28"
              aria-hidden="true"
              className="h-8 w-14 rounded-md border border-warning/30 bg-[#120d08] p-1 text-warning/80"
            >
              <path d={silhouettePath} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <Link
              href={`/weapons/${weapon.weapon_id}`}
              className="inline-flex h-7 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-accent/50 hover:text-accent"
            >
              Open
            </Link>
          </div>
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

        <div className="grid grid-cols-4 gap-2">
          {weapon.preview_tiles.slice(0, 7).map((tile) => {
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
                <span className="absolute inset-[2px] rounded-lg" style={camoStyle(tile.name, tile.groupType)} />
                <span className="relative z-[1] rounded-md bg-black/45 px-1.5 py-0.5 text-[9px] text-white">{tile.name}</span>
              </button>
            );
          })}

          {weapon.mastery_tile && (
            <button
              type="button"
              aria-label={`Toggle ${weapon.mastery_tile.name}`}
              title={`${weapon.mastery_tile.name} (${progressMap[weapon.mastery_tile.id] ?? "locked"})`}
              disabled={!isLoggedIn || pending}
              onClick={() => toggleTile(weapon.mastery_tile as Tile)}
              className={`${tileBaseClass} ${tileClass(progressMap[weapon.mastery_tile.id] ?? "locked")} col-span-1 ${
                !isLoggedIn ? "cursor-not-allowed opacity-70" : "active:scale-95"
              }`}
            >
              <span
                className="absolute inset-[2px] rounded-lg"
                style={camoStyle(weapon.mastery_tile.name, weapon.mastery_tile.groupType)}
              />
              <span className="relative z-[1] rounded-md bg-black/45 px-1.5 py-0.5 text-[9px] text-white">Mastery</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent"
        >
          {isExpanded ? "Hide Camo Details" : "Expand Camo Details"}
        </button>

        {isExpanded && (
          <div className="space-y-2 rounded-xl border border-white/10 bg-black/15 p-2.5">
            {weapon.camo_list.map((camo) => {
              const status = progressMap[camo.id] ?? "locked";
              return (
                <button
                  key={camo.id}
                  type="button"
                  disabled={!isLoggedIn || pending}
                  onClick={() => toggleTile(camo)}
                  className={`grid w-full grid-cols-[54px,1fr] gap-2 rounded-xl border p-2 text-left transition ${
                    tileClass(status)
                  } ${!isLoggedIn ? "cursor-not-allowed opacity-80" : "active:scale-[0.99]"}`}
                >
                  <div className="relative h-12 overflow-hidden rounded-lg border border-white/20" style={camoStyle(camo.name, camo.groupType)}>
                    <span className="absolute bottom-1 right-1 rounded bg-black/55 px-1 text-[9px] uppercase tracking-[0.1em] text-white">
                      {camo.groupType}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white">{camo.name}</p>
                      <span className="shrink-0 rounded-md border border-white/15 bg-black/35 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.08em] text-slate-200">
                        {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Locked"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">{camo.requirement}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

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
