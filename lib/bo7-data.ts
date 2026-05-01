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
  imagePath?: string;
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
  { slug: "special", name: "Special" },
  { slug: "melee", name: "Melee" }
];

export const weapons: Weapon[] = [
  { id: "m15-mod-0", slug: "m15-mod-0", name: "M15 MOD 0", categorySlug: "assault-rifles", levelUnlock: "Launch", releaseOrder: 1 },
  { id: "mxr-17", slug: "mxr-17", name: "MXR-17", categorySlug: "assault-rifles", levelUnlock: "Launch", releaseOrder: 2 },
  { id: "peacekeeper-mk1", slug: "peacekeeper-mk1", name: "PEACEKEEPER MK1", categorySlug: "assault-rifles", levelUnlock: "Launch", releaseOrder: 3 },
  { id: "x9-maverick", slug: "x9-maverick", name: "X9 MAVERICK", categorySlug: "assault-rifles", levelUnlock: "Launch", releaseOrder: 4 },
  { id: "ds20-mirage", slug: "ds20-mirage", name: "DS20 MIRAGE", categorySlug: "assault-rifles", levelUnlock: "Launch", releaseOrder: 5 },
  { id: "ak-27", slug: "ak-27", name: "AK-27", categorySlug: "assault-rifles", levelUnlock: "Launch", releaseOrder: 6 },
  { id: "ryden-45k", slug: "ryden-45k", name: "RYDEN 45K", categorySlug: "smgs", levelUnlock: "Launch", releaseOrder: 7 },
  { id: "dravec-45", slug: "dravec-45", name: "DRAVEC 45", categorySlug: "smgs", levelUnlock: "Launch", releaseOrder: 8 },
  { id: "razor-9mm", slug: "razor-9mm", name: "RAZOR 9MM", categorySlug: "smgs", levelUnlock: "Launch", releaseOrder: 9 },
  { id: "carbon-57", slug: "carbon-57", name: "CARBON 57", categorySlug: "smgs", levelUnlock: "Launch", releaseOrder: 10 },
  { id: "mpc-25", slug: "mpc-25", name: "MPC-25", categorySlug: "smgs", levelUnlock: "Launch", releaseOrder: 11 },
  { id: "rk-9", slug: "rk-9", name: "RK-9", categorySlug: "smgs", levelUnlock: "Launch", releaseOrder: 12 },
  { id: "m10-breacher", slug: "m10-breacher", name: "M10 BREACHER", categorySlug: "shotguns", levelUnlock: "Launch", releaseOrder: 13 },
  { id: "echo-12", slug: "echo-12", name: "ECHO 12", categorySlug: "shotguns", levelUnlock: "Launch", releaseOrder: 14 },
  { id: "akita", slug: "akita", name: "AKITA", categorySlug: "shotguns", levelUnlock: "Launch", releaseOrder: 15 },
  { id: "mk-78", slug: "mk-78", name: "MK.78", categorySlug: "lmgs", levelUnlock: "Launch", releaseOrder: 16 },
  { id: "xm325", slug: "xm325", name: "XM325", categorySlug: "lmgs", levelUnlock: "Launch", releaseOrder: 17 },
  { id: "m8a1", slug: "m8a1", name: "M8A1", categorySlug: "marksman-rifles", levelUnlock: "Launch", releaseOrder: 18 },
  { id: "warden-308", slug: "warden-308", name: "WARDEN 308", categorySlug: "marksman-rifles", levelUnlock: "Launch", releaseOrder: 19 },
  { id: "m34-novaline", slug: "m34-novaline", name: "M34 NOVALINE", categorySlug: "marksman-rifles", levelUnlock: "Launch", releaseOrder: 20 },
  { id: "vs-recon", slug: "vs-recon", name: "VS RECON", categorySlug: "sniper-rifles", levelUnlock: "Launch", releaseOrder: 21 },
  { id: "xr-3-ion", slug: "xr-3-ion", name: "XR-3 ION", categorySlug: "sniper-rifles", levelUnlock: "Launch", releaseOrder: 22 },
  { id: "jager-45", slug: "jager-45", name: "Jäger 45", categorySlug: "pistols", levelUnlock: "Launch", releaseOrder: 23 },
  { id: "coda-9", slug: "coda-9", name: "CODA 9", categorySlug: "pistols", levelUnlock: "Launch", releaseOrder: 24 },
  { id: "velox-5-7", slug: "velox-5-7", name: "VELOX 5.7", categorySlug: "pistols", levelUnlock: "Launch", releaseOrder: 25 },
  { id: "aarow-109", slug: "aarow-109", name: "AAROW 109", categorySlug: "launchers", levelUnlock: "Launch", releaseOrder: 26 },
  { id: "arc-m1", slug: "arc-m1", name: "A.R.C. M1", categorySlug: "launchers", levelUnlock: "Launch", releaseOrder: 27 },
  { id: "knife", slug: "knife", name: "KNIFE", categorySlug: "melee", levelUnlock: "Launch", releaseOrder: 28 },
  { id: "flatline-mk-ii", slug: "flatline-mk-ii", name: "FLATLINE MK.II", categorySlug: "melee", levelUnlock: "Launch", releaseOrder: 29 },
  { id: "sturmwolf-45", slug: "sturmwolf-45", name: "Sturmwolf 45", categorySlug: "smgs", levelUnlock: "Season 01", releaseOrder: 30 },
  { id: "hawker-hx", slug: "hawker-hx", name: "Hawker HX", categorySlug: "sniper-rifles", levelUnlock: "Season 01", releaseOrder: 31 },
  { id: "sokol-545", slug: "sokol-545", name: "Sokol 545", categorySlug: "lmgs", levelUnlock: "Season 01", releaseOrder: 32 },
  { id: "nx-ravager", slug: "nx-ravager", name: "NX Ravager", categorySlug: "sniper-rifles", levelUnlock: "Season 01", releaseOrder: 33 },
  { id: "maddox-rfb", slug: "maddox-rfb", name: "MADDOX RFB", categorySlug: "assault-rifles", levelUnlock: "Season 01", releaseOrder: 34 },
  { id: "kogot-7", slug: "kogot-7", name: "KOGOT-7", categorySlug: "smgs", levelUnlock: "Season 01", releaseOrder: 35 },
  { id: "ballistic-knife", slug: "ballistic-knife", name: "BALLISTIC KNIFE", categorySlug: "melee", levelUnlock: "Season 01", releaseOrder: 36 },
  { id: "voyak-kt-3", slug: "voyak-kt-3", name: "VOYAK KT-3", categorySlug: "assault-rifles", levelUnlock: "Season 02", releaseOrder: 37 },
  { id: "swordfish-a1", slug: "swordfish-a1", name: "SWORDFISH A1", categorySlug: "marksman-rifles", levelUnlock: "Season 02", releaseOrder: 38 },
  { id: "gdl-havoc", slug: "gdl-havoc", name: "GDL Havoc", categorySlug: "special", levelUnlock: "Season 02", releaseOrder: 39 },
  { id: "sg-12", slug: "sg-12", name: "SG-12", categorySlug: "shotguns", levelUnlock: "Season 02", releaseOrder: 40 },
  { id: "egrt-17", slug: "egrt-17", name: "EGRT-17", categorySlug: "assault-rifles", levelUnlock: "Season 02", releaseOrder: 41 },
  { id: "rev-46", slug: "rev-46", name: "REV-46", categorySlug: "smgs", levelUnlock: "Season 02", releaseOrder: 42 },
  { id: "h311-saw", slug: "h311-saw", name: "H311-SAW", categorySlug: "melee", levelUnlock: "Season 02", releaseOrder: 43 },
  { id: "strider-300", slug: "strider-300", name: "Strider 300", categorySlug: "sniper-rifles", levelUnlock: "Season 03", releaseOrder: 44 },
  { id: "mk35-isr", slug: "mk35-isr", name: "MK35 ISR", categorySlug: "assault-rifles", levelUnlock: "Season 03", releaseOrder: 45 },
  { id: "vst", slug: "vst", name: "VST", categorySlug: "smgs", levelUnlock: "Season 03", releaseOrder: 46 }
];

const multiplayerCamoTemplate: Omit<Camo, "id" | "weaponId">[] = [
  { name: "UNDERBRUSH", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 1 },
  { name: "WOODLAND", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 2 },
  { name: "SLATE DIGITAL", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 3 },
  { name: "REDWOOD", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 4 },
  { name: "POISON", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 5 },
  { name: "TOXIC", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 6 },
  { name: "MOUNTAIN", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 7 },
  { name: "STALKER", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 8 },
  { name: "RUBY SNAKE", group: "Military", groupType: "base", requirement: "Official Multiplayer Military challenge (weapon-specific in BO7 guide)", unlockOrder: 9 },
  { name: "DIAMONDBACK", group: "Special", groupType: "special", requirement: "Official Multiplayer Special challenge (weapon-specific in BO7 guide)", unlockOrder: 10 },
  { name: "RAPTOR", group: "Special", groupType: "special", requirement: "Official Multiplayer Special challenge (weapon-specific in BO7 guide)", unlockOrder: 11 },
  { name: "MAINFRAME", group: "Special", groupType: "special", requirement: "Official Multiplayer Special challenge (weapon-specific in BO7 guide)", unlockOrder: 12 },
  { name: "SHATTERED GOLD", group: "Mastery", groupType: "mastery", requirement: "Official Multiplayer Mastery challenge (weapon/class-wide in BO7 guide)", unlockOrder: 13 },
  { name: "ARCLIGHT", group: "Mastery", groupType: "mastery", requirement: "Official Multiplayer Mastery challenge (weapon/class-wide in BO7 guide)", unlockOrder: 14 },
  { name: "TEMPEST", group: "Mastery", groupType: "mastery", requirement: "Official Multiplayer Mastery challenge (weapon/class-wide in BO7 guide)", unlockOrder: 15 },
  { name: "SINGULARITY", group: "Mastery", groupType: "mastery", requirement: "Official Multiplayer Mastery challenge (weapon/class-wide in BO7 guide)", unlockOrder: 16 }
];

const camoImageBySlug: Record<string, string> = {
  underbrush: "/camos/shared/underbrush.webp",
  woodland: "/camos/shared/woodland.webp",
  "slate-digital": "/camos/shared/slate-digital.webp",
  redwood: "/camos/shared/redwood.webp",
  poison: "/camos/shared/poison.webp",
  toxic: "/camos/shared/toxic.webp",
  mountain: "/camos/shared/mountain.webp",
  stalker: "/camos/shared/stalker.webp",
  "ruby-snake": "/camos/shared/ruby-snake.webp",
  "shattered-gold": "/camos/mastery/shattered-gold.webp",
  arclight: "/camos/mastery/arclight.webp",
  tempest: "/camos/mastery/tempest.webp",
  singularity: "/camos/mastery/singularity.webp"
};



const fallbackImageByGroupType: Record<CamoGroupType, string> = {
  base: "/camos/shared/underbrush.webp",
  special: "/camos/shared/woodland.webp",
  mastery: "/camos/mastery/shattered-gold.webp"
};

const resolveCamoImagePath = (template: Omit<Camo, "id" | "weaponId">): string => {
  const slug = toCamoIdPart(template.name);
  const mappedPath = camoImageBySlug[slug];

  if (mappedPath) return mappedPath;

  return fallbackImageByGroupType[template.groupType];
};
const toCamoIdPart = (input: string) =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const camos: Camo[] = weapons.flatMap((weapon) =>
  multiplayerCamoTemplate.map((template) => ({
    id: `${weapon.id}-${toCamoIdPart(template.name)}`,
    weaponId: weapon.id,
    imagePath: resolveCamoImagePath(template),
    ...template
  }))
);

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
