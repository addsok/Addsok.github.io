import * as bo7 from "@/lib/bo7-data";
import * as mw4 from "@/data/mw4";

export type GameData = {
  slug: string;
  weapons: typeof bo7.weapons;
  weaponCategories: typeof bo7.weaponCategories;
  camos: typeof bo7.camos;
  weaponById: typeof bo7.weaponById;
  categoryBySlug: typeof bo7.categoryBySlug;
  camosByWeaponId: typeof bo7.camosByWeaponId;
  camoById: typeof bo7.camoById;
  totalCamoCount: number;
};

export function getGameData(gameSlug: string): GameData | null {
  if (gameSlug === "bo7") {
    return {
      slug: "bo7",
      weapons: bo7.weapons,
      weaponCategories: bo7.weaponCategories,
      camos: bo7.camos,
      weaponById: bo7.weaponById,
      categoryBySlug: bo7.categoryBySlug,
      camosByWeaponId: bo7.camosByWeaponId,
      camoById: bo7.camoById,
      totalCamoCount: bo7.totalCamoCount
    };
  }

  if (gameSlug === "mw4") {
    return {
      slug: "mw4",
      weapons: mw4.weapons as GameData["weapons"],
      weaponCategories: mw4.weaponCategories,
      camos: mw4.camos,
      weaponById: mw4.weaponById as GameData["weaponById"],
      categoryBySlug: mw4.categoryBySlug,
      camosByWeaponId: mw4.camosByWeaponId,
      camoById: mw4.camoById,
      totalCamoCount: mw4.totalCamoCount
    };
  }

  return null;
}