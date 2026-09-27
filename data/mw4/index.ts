import type { Camo, Weapon, WeaponCategory } from "@/lib/bo7-data";

export type MW4Weapon = Weapon & {
  verification: "official-beta";
  betaAccess: "standard" | "default-loadout" | "campaign-only";
  weaponLevels: number;
  apexAttachment?: string;
};

export const weaponCategories: WeaponCategory[] = [
  { slug: "assault-rifles", name: "Assault Rifles" },
  { slug: "smgs", name: "SMGs" },
  { slug: "shotguns", name: "Shotguns" },
  { slug: "lmgs", name: "LMGs" },
  { slug: "marksman-rifles", name: "Marksman Rifles" },
  { slug: "sniper-rifles", name: "Sniper Rifles" },
  { slug: "pistols", name: "Pistols" },
  { slug: "launchers", name: "Launchers" },
  { slug: "melee", name: "Melee" }
];

const rawWeapons: Array<Omit<MW4Weapon, "id">> = [
  { slug: "han-86", name: "Han 86", categorySlug: "assault-rifles", levelUnlock: "Immediately", releaseOrder: 1, verification: "official-beta", betaAccess: "standard", weaponLevels: 68, apexAttachment: "Han X20 Skybreaker" },
  { slug: "m4", name: "M4", categorySlug: "assault-rifles", levelUnlock: "Player Rank 9", releaseOrder: 2, verification: "official-beta", betaAccess: "standard", weaponLevels: 68, apexAttachment: "M4 Hurricane" },
  { slug: "hyeon-burst", name: "Hyeon Burst", categorySlug: "assault-rifles", levelUnlock: "Player Rank 18", releaseOrder: 3, verification: "official-beta", betaAccess: "standard", weaponLevels: 64, apexAttachment: "Hyeon Auto / Hyeon Hyperburst" },
  { slug: "kastov-762", name: "Kastov 762", categorySlug: "assault-rifles", levelUnlock: "Player Rank 21", releaseOrder: 4, verification: "official-beta", betaAccess: "standard", weaponLevels: 71, apexAttachment: "Kastov 545 / Kastov ARC" },
  { slug: "patriot-xmr", name: "Patriot XMR", categorySlug: "assault-rifles", levelUnlock: "Player Rank 25", releaseOrder: 5, verification: "official-beta", betaAccess: "standard", weaponLevels: 64, apexAttachment: "Patriot XMR Volt" },
  { slug: "axion", name: "Axion", categorySlug: "assault-rifles", levelUnlock: "Default Loadout", releaseOrder: 6, verification: "official-beta", betaAccess: "default-loadout", weaponLevels: 67, apexAttachment: "Axion Crusader" },
  { slug: "iso-nightshade", name: "ISO Nightshade", categorySlug: "smgs", levelUnlock: "Immediately", releaseOrder: 7, verification: "official-beta", betaAccess: "standard", weaponLevels: 56, apexAttachment: "ISO Trace" },
  { slug: "ppsh-41", name: "PPSh-41", categorySlug: "smgs", levelUnlock: "Player Rank 11", releaseOrder: 8, verification: "official-beta", betaAccess: "standard", weaponLevels: 54, apexAttachment: "PPSh-41 Ember" },
  { slug: "x-58-nyx", name: "X-58 Nyx", categorySlug: "smgs", levelUnlock: "Player Rank 27", releaseOrder: 9, verification: "official-beta", betaAccess: "standard", weaponLevels: 47, apexAttachment: "X-58 Void" },
  { slug: "wz-55-striga", name: "WZ.55 Striga", categorySlug: "smgs", levelUnlock: "Campaign Mission", releaseOrder: 10, verification: "official-beta", betaAccess: "campaign-only", weaponLevels: 52, apexAttachment: "Classified" },
  { slug: "rezi-12", name: "Rezi 12", categorySlug: "shotguns", levelUnlock: "Immediately", releaseOrder: 11, verification: "official-beta", betaAccess: "standard", weaponLevels: 60, apexAttachment: "Rezi 12 Enforcer" },
  { slug: "finn-lmg", name: "FiNN LMG", categorySlug: "lmgs", levelUnlock: "Immediately", releaseOrder: 12, verification: "official-beta", betaAccess: "standard", weaponLevels: 52, apexAttachment: "FiNN Adverse" },
  { slug: "type-73", name: "Type 73", categorySlug: "lmgs", levelUnlock: "Player Rank 5", releaseOrder: 13, verification: "official-beta", betaAccess: "standard", weaponLevels: 57, apexAttachment: "Type 73 Assault" },
  { slug: "mar-9", name: "MAR-9", categorySlug: "marksman-rifles", levelUnlock: "Immediately", releaseOrder: 14, verification: "official-beta", betaAccess: "standard", weaponLevels: 67, apexAttachment: "MAR-9 Auto" },
  { slug: "oris-8-6", name: "Oris 8.6", categorySlug: "marksman-rifles", levelUnlock: "Player Rank 14", releaseOrder: 15, verification: "official-beta", betaAccess: "standard", weaponLevels: 68, apexAttachment: "Oris 8.6 Razor" },
  { slug: "kg-7-vulcan", name: "KG-7 Vulcan", categorySlug: "sniper-rifles", levelUnlock: "Immediately", releaseOrder: 16, verification: "official-beta", betaAccess: "standard", weaponLevels: 72, apexAttachment: "KG-9 Drillcharge" },
  { slug: "signal-50", name: "Signal .50", categorySlug: "sniper-rifles", levelUnlock: "Player Rank 30", releaseOrder: 17, verification: "official-beta", betaAccess: "standard", weaponLevels: 73, apexAttachment: "Signal 50 Inferno" },
  { slug: "karit-p68", name: "Karit P68", categorySlug: "pistols", levelUnlock: "Immediately", releaseOrder: 18, verification: "official-beta", betaAccess: "standard", weaponLevels: 34, apexAttachment: "Karit P68 Commando" },
  { slug: "50-gs", name: ".50 GS", categorySlug: "pistols", levelUnlock: "Player Rank 23", releaseOrder: 19, verification: "official-beta", betaAccess: "standard", weaponLevels: 50, apexAttachment: "GS Magna" },
  { slug: "sang-9mm", name: "Sang 9mm", categorySlug: "pistols", levelUnlock: "Default Loadout", releaseOrder: 20, verification: "official-beta", betaAccess: "default-loadout", weaponLevels: 34, apexAttachment: "Sang 9&12" },
  { slug: "pila", name: "PILA", categorySlug: "launchers", levelUnlock: "Immediately", releaseOrder: 21, verification: "official-beta", betaAccess: "standard", weaponLevels: 36 },
  { slug: "combat-knife", name: "Combat Knife", categorySlug: "melee", levelUnlock: "Immediately", releaseOrder: 22, verification: "official-beta", betaAccess: "standard", weaponLevels: 30 }
];

export const weapons: MW4Weapon[] = rawWeapons.map((weapon) => ({
  id: \`mw4-\${weapon.slug}\`,
  ...weapon
}));

export const confirmedUniversalCamos: Camo[] = [
  {
    id: "mw4-universal-moonlit-pearl",
    weaponId: "mw4-universal",
    name: "Moonlit Pearl",
    group: "Universal",
    groupType: "special",
    requirement: "Universal Weapon Camo. Officially confirmed for MW4 at launch.",
    unlockOrder: 1
  },
  {
    id: "mw4-universal-gilded-ruin",
    weaponId: "mw4-universal",
    name: "Gilded Ruin",
    group: "Universal",
    groupType: "special",
    requirement: "Universal Weapon Camo. Officially confirmed for MW4 at launch.",
    unlockOrder: 2
  }
];

export const weaponById = new Map(weapons.map((weapon) => [weapon.id, weapon]));
export const categoryBySlug = new Map(weaponCategories.map((category) => [category.slug, category]));
export const camos: Camo[] = confirmedUniversalCamos;
export const camoById = new Map(camos.map((camo) => [camo.id, camo]));
export const camosByWeaponId = new Map<string, Camo[]>();
export const totalCamoCount = camos.length;