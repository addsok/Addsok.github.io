import { createClient } from "@supabase/supabase-js";
import { camoData, camoGroups } from "../data/bo7/camos";
import { weaponCategories, weapons } from "../data/bo7/weapons";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  for (const category of weaponCategories) {
    await supabase.from("weapon_categories").upsert({ slug: category.slug, name: category.name }, { onConflict: "slug" });
  }
  const { data: categories } = await supabase.from("weapon_categories").select("id,slug");
  const categoryMap = new Map(categories?.map((c) => [c.slug, c.id]));

  for (const weapon of weapons) {
    await supabase.from("weapons").upsert({
      slug: weapon.slug,
      name: weapon.name,
      category_id: categoryMap.get(weapon.category),
      level_unlock: weapon.levelUnlock,
      release_order: weapon.releaseOrder
    }, { onConflict: "slug" });
  }

  for (const group of camoGroups) {
    await supabase.from("camo_groups").upsert(group, { onConflict: "name,type" });
  }

  const [{ data: groupRows }, { data: weaponRows }] = await Promise.all([
    supabase.from("camo_groups").select("id,name"),
    supabase.from("weapons").select("id,slug")
  ]);
  const groupMap = new Map(groupRows?.map((g) => [g.name, g.id]));
  const weaponMap = new Map(weaponRows?.map((w) => [w.slug, w.id]));

  for (const [weaponSlug, entries] of Object.entries(camoData)) {
    const weaponId = weaponMap.get(weaponSlug);
    let unlockOrder = 1;
    for (const entry of entries) {
      const { data: camo } = await supabase.from("camos").upsert({
        weapon_id: weaponId,
        camo_group_id: groupMap.get(entry.group),
        name: entry.name,
        unlock_order: unlockOrder++
      }, { onConflict: "weapon_id,name" }).select("id").single();

      if (camo?.id) {
        await supabase.from("camo_requirements").upsert({ camo_id: camo.id, requirement_text: entry.requirement }, { onConflict: "camo_id" });
      }
    }
  }

  console.log("BO7 seed complete");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
