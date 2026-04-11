export const camoGroups = [
  { name: "Military", type: "base" },
  { name: "Special Ops", type: "special" },
  { name: "Mastery", type: "mastery" }
] as const;

export const camoData = {
  "xr-27": [
    { name: "Dune Fang", group: "Military", requirement: "Get 100 eliminations" },
    { name: "Night Circuit", group: "Military", requirement: "Get 50 headshots" },
    { name: "Corrosive", group: "Special Ops", requirement: "Get 20 longshots" },
    { name: "Nebula", group: "Mastery", requirement: "Complete all XR-27 base and special camos" }
  ],
  "vandal-k": [
    { name: "Mire", group: "Military", requirement: "Get 100 eliminations" },
    { name: "Arctic Smear", group: "Military", requirement: "Get 30 crouched eliminations" },
    { name: "Crimson Wire", group: "Special Ops", requirement: "Get 25 kills shortly after sprinting" },
    { name: "Aether Gold", group: "Mastery", requirement: "Complete all Vandal K base and special camos" }
  ],
  "manta-9": [
    { name: "Urban Bite", group: "Military", requirement: "Get 100 eliminations" },
    { name: "Flux", group: "Military", requirement: "Get 25 hipfire eliminations" },
    { name: "Stinger", group: "Special Ops", requirement: "Get 15 point blank kills" },
    { name: "Photon", group: "Mastery", requirement: "Complete all Manta-9 base and special camos" }
  ],
  "specter-lw3": [
    { name: "Prairie Dust", group: "Military", requirement: "Get 80 eliminations" },
    { name: "Polar Vein", group: "Military", requirement: "Get 50 one shot one kills" },
    { name: "Glass Trap", group: "Special Ops", requirement: "Get 20 holding breath kills" },
    { name: "Abyss", group: "Mastery", requirement: "Complete all Specter LW3 base and special camos" }
  ]
} as const;
