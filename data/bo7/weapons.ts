// Update this file season-by-season. UI reads data from DB, not hardcoded components.
export const weaponCategories = [
  { slug: "assault-rifles", name: "Assault Rifles" },
  { slug: "smgs", name: "SMGs" },
  { slug: "snipers", name: "Sniper Rifles" }
];

export const weapons = [
  { slug: "xr-27", name: "XR-27", category: "assault-rifles", levelUnlock: "Level 4", releaseOrder: 1 },
  { slug: "vandal-k", name: "Vandal K", category: "assault-rifles", levelUnlock: "Level 19", releaseOrder: 2 },
  { slug: "manta-9", name: "Manta-9", category: "smgs", levelUnlock: "Level 1", releaseOrder: 3 },
  { slug: "specter-lw3", name: "Specter LW3", category: "snipers", levelUnlock: "Level 16", releaseOrder: 4 }
];
