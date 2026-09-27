import { createClient } from "@/lib/supabase/server";
import { pct } from "@/lib/utils";
import { getGameData } from "@/lib/game-registry";

type ProgressRow = {
  user_id: string;
  camo_id: string;
  status: "locked" | "in_progress" | "completed";
  updated_at: string;
};

const DEFAULT_GAME = "mw4";

function dataFor(gameSlug = DEFAULT_GAME) {
  return getGameData(gameSlug) ?? getGameData(DEFAULT_GAME)!;
}

export async function getDashboardData(gameSlug = DEFAULT_GAME) {
  const game = dataFor(gameSlug);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: progress }, leaderboard] = await Promise.all([
    supabase.from("user_camo_progress").select("camo_id,status,updated_at").eq("user_id", user.id),
    getLeaderboardRows({ userId: user.id, gameSlug: game.slug })
  ]);

  const validProgress = (progress ?? []).filter((row) => game.camoById.has(row.camo_id));
  const completedRows = validProgress.filter((row) => row.status === "completed");
  const completedCamoIds = new Set(completedRows.map((row) => row.camo_id));

  const mastery = completedRows.filter((row) => game.camoById.get(row.camo_id)?.groupType === "mastery").length;

  const weaponsCompleted = game.weapons.filter((weapon) => {
    const weaponCamos = game.camosByWeaponId.get(weapon.id) ?? [];
    return weaponCamos.length > 0 && weaponCamos.every((camo) => completedCamoIds.has(camo.id));
  }).length;

  const me = leaderboard.rows.find((row) => row.user_id === user.id);
  const recent = validProgress
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 8);

  return {
    game: game.slug,
    completed: completedRows.length,
    total: game.totalCamoCount,
    overallPct: pct(completedRows.length, game.totalCamoCount),
    mastery,
    weaponsCompleted,
    currentRank: me?.rank_position ?? null,
    recent,
    totalWeapons: game.weapons.length,
    universalCamos: game.universalCamos.map((camo) => ({
      ...camo,
      status: ((progress ?? []).find((row) => row.camo_id === camo.id)?.status ?? "locked") as ProgressRow["status"]
    }))
  };
}

export async function getWeaponsWithProgress(filters: {
  category?: string;
  search?: string;
  sort?: string;
  status?: string;
}, gameSlug = DEFAULT_GAME) {
  const game = dataFor(gameSlug);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: progress } = user
    ? await supabase.from("user_camo_progress").select("camo_id,status").eq("user_id", user.id)
    : { data: [] };

  const progressMap = new Map(
    (progress ?? [])
      .filter((row) => game.camoById.has(row.camo_id))
      .map((row) => [row.camo_id, row.status as "locked" | "in_progress" | "completed"])
  );

  const completedCamoIds = new Set(
    [...progressMap.entries()].filter(([, status]) => status === "completed").map(([camoId]) => camoId)
  );

  let rows = game.weapons.map((weapon) => {
    const weaponCamos = game.camosByWeaponId.get(weapon.id) ?? [];
    const completedCount = weaponCamos.filter((camo) => completedCamoIds.has(camo.id)).length;
    const totalCount = weaponCamos.length;
    const category = game.categoryBySlug.get(weapon.categorySlug);
    const previewTiles = weaponCamos.filter((camo) => camo.groupType !== "mastery").slice(0, 8);
    const masteryTile = [...weaponCamos].reverse().find((camo) => camo.groupType === "mastery") ?? null;

    return {
      weapon_id: weapon.id,
      weapon_name: weapon.name,
      category_name: category?.name ?? weapon.categorySlug,
      category_slug: weapon.categorySlug,
      level_unlock: weapon.levelUnlock,
      completed_count: completedCount,
      total_count: totalCount,
      completion_pct: pct(completedCount, totalCount),
      release_order: weapon.releaseOrder,
      preview_tiles: previewTiles.map((tile) => ({ id: tile.id, name: tile.name, groupType: tile.groupType, imagePath: tile.imagePath })),
      mastery_tile: masteryTile ? { id: masteryTile.id, name: masteryTile.name, groupType: masteryTile.groupType, imagePath: masteryTile.imagePath } : null,
      camo_list: weaponCamos.map((camo) => ({
        id: camo.id, name: camo.name, groupType: camo.groupType, imagePath: camo.imagePath,
        requirement: camo.requirement, unlock_order: camo.unlockOrder
      })),
      progress_map: Object.fromEntries(weaponCamos.map((tile) => [tile.id, progressMap.get(tile.id) ?? "locked"]))
    };
  });

  if (filters.category) rows = rows.filter((row) => row.category_slug === filters.category);
  if (filters.search) {
    const term = filters.search.toLowerCase();
    rows = rows.filter((row) => row.weapon_name.toLowerCase().includes(term));
  }
  if (filters.status === "completed") rows = rows.filter((row) => row.completion_pct === 100);
  if (filters.status === "in_progress") rows = rows.filter((row) => row.completed_count > 0 && row.completion_pct < 100);

  const sort = filters.sort || "az";
  if (sort === "most_completed") rows.sort((a, b) => b.completion_pct - a.completion_pct || a.weapon_name.localeCompare(b.weapon_name));
  else if (sort === "least_completed") rows.sort((a, b) => a.completion_pct - b.completion_pct || a.weapon_name.localeCompare(b.weapon_name));
  else if (sort === "newest") rows.sort((a, b) => b.release_order - a.release_order || a.weapon_name.localeCompare(b.weapon_name));
  else rows.sort((a, b) => a.weapon_name.localeCompare(b.weapon_name));

  return {
    rows,
    isLoggedIn: !!user,
    game: game.slug,
    universalCamos: game.universalCamos.map((camo) => ({
      ...camo,
      status: progressMap.get(camo.id) ?? "locked"
    }))
  };
}

export async function getWeaponDetailData(weaponId: string, gameSlug = DEFAULT_GAME) {
  const game = dataFor(gameSlug);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const weapon = game.weaponById.get(weaponId);
  if (!weapon) return null;

  const weaponCamos = game.camosByWeaponId.get(weapon.id) ?? [];
  const { data: progress } = user
    ? await supabase.from("user_camo_progress").select("camo_id,status").eq("user_id", user.id)
    : { data: [] };

  const progressMap = new Map(
    (progress ?? []).filter((row) => game.camoById.has(row.camo_id)).map((row) => [row.camo_id, row.status])
  );

  return {
    isLoggedIn: !!user,
    weapon,
    category: game.categoryBySlug.get(weapon.categorySlug),
    camos: weaponCamos,
    progressMap,
    game: game.slug,
    universalCamos: game.universalCamos.map((camo) => ({ ...camo, status: progressMap.get(camo.id) ?? "locked" }))
  };
}

export async function getCategoryProgressData(gameSlug = DEFAULT_GAME) {
  const game = dataFor(gameSlug);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: progress } = user
    ? await supabase.from("user_camo_progress").select("camo_id,status").eq("user_id", user.id)
    : { data: [] };

  const progressMap = new Map(
    (progress ?? []).filter((row) => game.camoById.has(row.camo_id)).map((row) => [row.camo_id, row.status as "locked" | "in_progress" | "completed"])
  );
  const completedCamoIds = new Set([...progressMap.entries()].filter(([, status]) => status === "completed").map(([id]) => id));

  return game.weaponCategories.map((category) => {
    const categoryWeapons = game.weapons.filter((weapon) => weapon.categorySlug === category.slug);
    const categoryCamos = categoryWeapons.flatMap((weapon) => game.camosByWeaponId.get(weapon.id) ?? []);
    const completedCount = categoryCamos.filter((camo) => completedCamoIds.has(camo.id)).length;
    return {
      category_id: category.slug,
      category_name: category.name,
      total_count: categoryCamos.length,
      completed_count: completedCount,
      completion_pct: pct(completedCount, categoryCamos.length)
    };
  });
}

export async function getLeaderboardRows(options?: { platform?: string; userId?: string; gameSlug?: string }) {
  const game = dataFor(options?.gameSlug);
  const supabase = await createClient();
  let profilesQuery = supabase.from("profiles").select("id,username,platform,created_at");
  if (options?.platform) profilesQuery = profilesQuery.eq("platform", options.platform);

  const [{ data: profiles }, { data: progress }] = await Promise.all([
    profilesQuery,
    supabase.from("user_camo_progress").select("user_id,camo_id,status,updated_at")
  ]);

  const progressList = (progress ?? []).filter((row) => game.camoById.has(row.camo_id));
  const progressByUser = new Map<string, ProgressRow[]>();
  for (const row of progressList) {
    const existing = progressByUser.get(row.user_id) ?? [];
    existing.push(row);
    progressByUser.set(row.user_id, existing);
  }

  const rows = (profiles ?? []).map((profile) => {
    const userProgress = progressByUser.get(profile.id) ?? [];
    const completed = userProgress.filter((row) => row.status === "completed");
    const masteryCount = completed.filter((row) => game.camoById.get(row.camo_id)?.groupType === "mastery").length;

    return {
      user_id: profile.id,
      username: profile.username,
      platform: profile.platform,
      completed_count: completed.length,
      completion_pct: pct(completed.length, game.totalCamoCount),
      mastery_count: masteryCount,
      last_updated: userProgress.map((row) => row.updated_at).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? profile.created_at
    };
  });

  rows.sort((a, b) => b.completed_count - a.completed_count || b.completion_pct - a.completion_pct || b.mastery_count - a.mastery_count || new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());

  const ranked = rows.map((row, index) => ({ ...row, rank_position: index + 1 }));
  const me = options?.userId ? ranked.find((row) => row.user_id === options.userId) ?? null : null;
  return { rows: ranked.slice(0, 100), me };
}
