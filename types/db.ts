export type ProgressStatus = "locked" | "in_progress" | "completed";

export type Weapon = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  level_unlock: string | null;
  release_order: number;
  created_at: string;
  weapon_categories?: { id: string; name: string; slug: string };
};
