export type CamoGroupType = "base" | "special" | "mastery";

export type WeaponCategory = {
  slug: string;
  name: string;
};

export type Weapon = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  levelUnlock: string;
  releaseOrder: number;
};

export type Camo = {
  id: string;
  weaponId: string;
  name: string;
  group: string;
  groupType: CamoGroupType;
  requirement: string;
  unlockOrder: number;
};

export const weaponCategories: WeaponCategory[] = [
  { slug: "assault-rifles", name: "Assault Rifles" },
  { slug: "smgs", name: "SMGs" },
  { slug: "snipers", name: "Sniper Rifles" }
];

export const weapons: Weapon[] = [
  { id: "xr-27", slug: "xr-27", name: "XR-27", categorySlug: "assault-rifles", levelUnlock: "Level 4", releaseOrder: 1 },
  { id: "vandal-k", slug: "vandal-k", name: "Vandal K", categorySlug: "assault-rifles", levelUnlock: "Level 19", releaseOrder: 2 },
  { id: "manta-9", slug: "manta-9", name: "Manta-9", categorySlug: "smgs", levelUnlock: "Level 1", releaseOrder: 3 },
  { id: "specter-lw3", slug: "specter-lw3", name: "Specter LW3", categorySlug: "snipers", levelUnlock: "Level 16", releaseOrder: 4 }
];

export const camos: Camo[] = [
  { id: "xr-27-dune-fang", weaponId: "xr-27", name: "Dune Fang", group: "Military", groupType: "base", requirement: "Get 100 eliminations", unlockOrder: 1 },
  { id: "xr-27-night-circuit", weaponId: "xr-27", name: "Night Circuit", group: "Military", groupType: "base", requirement: "Get 50 headshots", unlockOrder: 2 },
  { id: "xr-27-corrosive", weaponId: "xr-27", name: "Corrosive", group: "Special Ops", groupType: "special", requirement: "Get 20 longshots", unlockOrder: 3 },
  { id: "xr-27-nebula", weaponId: "xr-27", name: "Nebula", group: "Mastery", groupType: "mastery", requirement: "Complete all XR-27 base and special camos", unlockOrder: 4 },

  { id: "vandal-k-mire", weaponId: "vandal-k", name: "Mire", group: "Military", groupType: "base", requirement: "Get 100 eliminations", unlockOrder: 1 },
  { id: "vandal-k-arctic-smear", weaponId: "vandal-k", name: "Arctic Smear", group: "Military", groupType: "base", requirement: "Get 30 crouched eliminations", unlockOrder: 2 },
  { id: "vandal-k-crimson-wire", weaponId: "vandal-k", name: "Crimson Wire", group: "Special Ops", groupType: "special", requirement: "Get 25 kills shortly after sprinting", unlockOrder: 3 },
  { id: "vandal-k-aether-gold", weaponId: "vandal-k", name: "Aether Gold", group: "Mastery", groupType: "mastery", requirement: "Complete all Vandal K base and special camos", unlockOrder: 4 },

  { id: "manta-9-urban-bite", weaponId: "manta-9", name: "Urban Bite", group: "Military", groupType: "base", requirement: "Get 100 eliminations", unlockOrder: 1 },
  { id: "manta-9-flux", weaponId: "manta-9", name: "Flux", group: "Military", groupType: "base", requirement: "Get 25 hipfire eliminations", unlockOrder: 2 },
  { id: "manta-9-stinger", weaponId: "manta-9", name: "Stinger", group: "Special Ops", groupType: "special", requirement: "Get 15 point blank kills", unlockOrder: 3 },
  { id: "manta-9-photon", weaponId: "manta-9", name: "Photon", group: "Mastery", groupType: "mastery", requirement: "Complete all Manta-9 base and special camos", unlockOrder: 4 },

  { id: "specter-lw3-prairie-dust", weaponId: "specter-lw3", name: "Prairie Dust", group: "Military", groupType: "base", requirement: "Get 80 eliminations", unlockOrder: 1 },
  { id: "specter-lw3-polar-vein", weaponId: "specter-lw3", name: "Polar Vein", group: "Military", groupType: "base", requirement: "Get 50 one shot one kills", unlockOrder: 2 },
  { id: "specter-lw3-glass-trap", weaponId: "specter-lw3", name: "Glass Trap", group: "Special Ops", groupType: "special", requirement: "Get 20 holding breath kills", unlockOrder: 3 },
  { id: "specter-lw3-abyss", weaponId: "specter-lw3", name: "Abyss", group: "Mastery", groupType: "mastery", requirement: "Complete all Specter LW3 base and special camos", unlockOrder: 4 }
];

export const weaponById = new Map(weapons.map((weapon) => [weapon.id, weapon]));
export const categoryBySlug = new Map(weaponCategories.map((category) => [category.slug, category]));
export const camosByWeaponId = new Map<string, Camo[]>();
export const camoById = new Map(camos.map((camo) => [camo.id, camo]));

for (const camo of camos) {
  const existing = camosByWeaponId.get(camo.weaponId) ?? [];
  existing.push(camo);
  camosByWeaponId.set(camo.weaponId, existing);
}

for (const weaponCamos of camosByWeaponId.values()) {
  weaponCamos.sort((a, b) => a.unlockOrder - b.unlockOrder);
}

export const totalCamoCount = camos.length;
