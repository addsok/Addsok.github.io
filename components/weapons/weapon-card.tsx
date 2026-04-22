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
  imagePath?: string;
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
  "group relative flex h-12 w-full shrink-0 items-end justify-start overflow-hidden rounded-xl border text-left transition";

const silhouettePathByCategory: Record<string, string> = {
  "assault-rifles": "M3 19h6l6-4h10l4 2h8v2h-8l-4 2H15l-6-4H3z",
  smgs: "M4 18h9l4-3h9l3 2h5v2h-5l-3 3h-4l-2 3h-3l1-3h-5l-5-4H4z",
  shotguns: "M3 18h10l5-3h15v2H19l-5 3H3z",
  lmgs: "M3 18h10l7-4h11l4 2h4v2h-5l-3 2h-8l-2 3h-4l1-3h-5l-6-2H3z",
  "marksman-rifles": "M3 18h8l8-4h12v2H20l-8 4H3z",
  "sniper-rifles": "M2 18h9l9-5h12v2H21l-9 5H2z",
  pistols: "M10 9h10v7h4v2h-6l-2 7h-3v-7h-3z",
  launchers: "M2 16h23v3H2z",
  melee: "M16 4l2 2-8 8-2-2zM8 14l6 6 2-2-6-6z"
};

function resolveCamoBackground(tile: Tile) {
  const src = tile.imagePath;

  if (src) {
    const hash = [...tile.name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const hue = hash % 360;
    return {
      backgroundImage: `
        linear-gradient(140deg, hsla(${hue}, 45%, 40%, 0.72), hsla(${(hue + 30) % 360}, 35%, 15%, 0.92)),
        url(${src})
      `,
      backgroundSize: "cover, cover",
      backgroundPosition: "center, center"
    };
  }

  const hash = [...tile.name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = hash % 360;
  const sat = tile.groupType === "mastery" ? 82 : tile.groupType === "special" ? 62 : 38;
  const lightA = tile.groupType === "mastery" ? 58 : 42;
  const lightB = tile.groupType === "mastery" ? 36 : 18;

  return {
    backgroundImage: `
      linear-gradient(140deg, hsla(${hue}, ${sat}%, ${lightA}%, 0.88), hsla(${(hue + 30) % 360}, ${sat}%, ${lightB}%, 0.96)),
      radial-gradient(circle at 22% 25%, rgba(255,255,255,0.28) 0 8%, transparent 18%),
      repeating-linear-gradient(130deg, rgba(0,0,0,0.12) 0 6px, rgba(255,255,255,0.05) 6px 12px)
    `
  };
}

export function WeaponCard({ weapon, isNew, isLoggedIn }: WeaponCardProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [isExpanded, setExpanded] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, Status>>(weapon.progress_map);

  const completedCount = useMemo(
    () => weapon.camo_list.reduce((acc, camo) => acc + (progressMap[camo.id] === "completed" ? 1 : 0), 0),
    [progressMap, weapon.camo_list]
  );

  const cardPct = weapon.total_count > 0 ? Math.round((completedCount / weapon.total_count) * 100) : weapon.completion_pct;

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

  const tileClass = (status: Status, groupType: Tile["groupType"]) => {
    const prominence = groupType === "mastery" ? "ring-1 ring-warning/50 shadow-[0_0_14px_rgba(245,158,11,0.35)]" : "";

    if (status === "completed") {
      return `border-warning/75 text-white ${prominence}`;
    }
    if (status === "in_progress") {
      return `border-accent/55 text-accent ${prominence}`;
    }
    return `border-white/15 text-slate-300 hover:border-accent/45 ${prominence}`;
  };

  const silhouettePath = silhouettePathByCategory[weapon.category_slug] ?? silhouettePathByCategory["assault-rifles"];
  const compactTiles = [...weapon.preview_tiles.slice(0, 5), ...(weapon.mastery_tile ? [weapon.mastery_tile] : [])];

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-panel/95 p-3 shadow-glow">
      <div className="space-y-2.5">
        <header className="flex items-start justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-semibold leading-tight text-white">{weapon.weapon_name}</h3>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
              <span>{weapon.category_name}</span>
              <span className="text-slate-600">•</span>
              <span>{weapon.level_unlock}</span>
              {isNew && (
                <span className="rounded-full border border-warning/40 bg-warning/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-warning">
                  New
                </span>
              )}
            </p>
          </div>

          <div className="flex shrink-0 items-start gap-1.5">
            <svg
              viewBox="0 0 40 28"
              aria-hidden="true"
              className="h-8 w-14 rounded-md border border-warning/30 bg-[#120d08] p-1 text-warning/80"
            >
              <path d={silhouettePath} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <button
              type="button"
              aria-label={isFavorite ? "Unfavorite weapon" : "Favorite weapon"}
              onClick={() => setFavorite((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-xs text-slate-300 transition hover:border-warning/45 hover:text-warning"
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        </header>

        <div>
          <div className="mb-1 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">
              {completedCount} / {weapon.total_count} camos completed
            </span>
            <span className="font-semibold text-accent">{cardPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-accentMuted via-accent to-warning"
              style={{ width: `${cardPct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {compactTiles.map((tile, index) => {
            const status = progressMap[tile.id] ?? "locked";
            const isMastery = tile.groupType === "mastery";

            return (
              <button
                key={tile.id}
                type="button"
                aria-label={`Toggle ${tile.name}`}
                title={`${tile.name} (${status})`}
                disabled={!isLoggedIn || pending}
                onClick={() => toggleTile(tile)}
                className={`${tileBaseClass} ${tileClass(status, tile.groupType)} ${
                  isMastery ? "col-span-1 sm:col-span-2" : "col-span-1"
                } ${!isLoggedIn ? "cursor-not-allowed opacity-70" : "active:scale-[0.98]"}`}
              >
                <span className="absolute inset-[2px] rounded-lg" style={resolveCamoBackground(tile)} />
                <span className="relative z-[1] m-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                  {isMastery ? "Mastery" : tile.name}
                </span>
                {status === "completed" && (
                  <span className="absolute right-1.5 top-1.5 z-[1] rounded bg-black/65 px-1 py-0.5 text-[9px] text-warning">✓</span>
                )}
                {index === 0 && !isLoggedIn && (
                  <span className="absolute left-1.5 top-1.5 z-[1] rounded bg-black/70 px-1 py-0.5 text-[8px] uppercase text-slate-200">
                    Login
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-black/15 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.11em] text-accent"
        >
          <span>{isExpanded ? "Hide camo details" : "View camo details"}</span>
          <span aria-hidden="true" className={`transition ${isExpanded ? "rotate-180" : ""}`}>
            ˅
          </span>
        </button>

        {isExpanded && (
          <div className="space-y-1.5">
            {weapon.camo_list.map((camo) => {
              const status = progressMap[camo.id] ?? "locked";

              return (
                <button
                  key={camo.id}
                  type="button"
                  disabled={!isLoggedIn || pending}
                  onClick={() => toggleTile(camo)}
                  className={`grid w-full grid-cols-[56px,1fr,auto] items-center gap-2 rounded-xl border p-1.5 text-left transition ${
                    tileClass(status, camo.groupType)
                  } ${!isLoggedIn ? "cursor-not-allowed opacity-80" : "active:scale-[0.99]"}`}
                >
                  <div className="relative h-11 overflow-hidden rounded-lg border border-white/20" style={resolveCamoBackground(camo)} />
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-white">{camo.name}</p>
                    <p className="text-[10px] text-slate-300">{camo.requirement}</p>
                  </div>
                  <span className="shrink-0 rounded-md border border-white/15 bg-black/35 px-1.5 py-1 text-[9px] uppercase tracking-[0.08em] text-slate-200">
                    {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Locked"}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between pt-0.5">
          {!isLoggedIn ? (
            <p className="text-[11px] text-slate-400">
              <Link href="/login" className="text-accent hover:underline">
                Log in
              </Link>{" "}
              to update progress.
            </p>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Tap any tile to toggle completion</span>
          )}
          <Link
            href={`/weapons/${weapon.weapon_id}`}
            className="inline-flex h-7 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-accent/50 hover:text-accent"
          >
            Open
          </Link>
        </div>
      </div>
    </article>
  );
}
