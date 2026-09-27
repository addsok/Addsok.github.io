import * as bo7 from "@/lib/bo7-data";
import * as mw4 from "@/data/mw4";
import type { Camo, Weapon, WeaponCategory } from "@/lib/bo7-data";

export type GameData = {
  slug: string;
  weapons: Weapon[];
  weaponCategories: WeaponCategory[];
  camos: Camo[];
  weaponById: Map<string, Weapon>;
  categoryBySlug: Map<string, WeaponCategory>;
  camosByWeaponId: Map<string, Camo[]>;
  camoById: Map<string, Camo>;
  totalCamoCount: number;
  universalCamos: Camo[];
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
      totalCamoCount: bo7.totalCamoCount,
      universalCamos: []
    };
  }

  if (gameSlug === "mw4") {
    return {
      slug: "mw4",
      weapons: mw4.weapons,
      weaponCategories: mw4.weaponCategories,
      camos: mw4.camos,
      weaponById: mw4.weaponById,
      categoryBySlug: mw4.categoryBySlug,
      camosByWeaponId: mw4.camosByWeaponId,
      camoById: mw4.camoById,
      totalCamoCount: mw4.totalCamoCount,
      universalCamos: mw4.confirmedUniversalCamos
    };
  }

  return null;
}
