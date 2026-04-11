export type ProgressStatus = "locked" | "in_progress" | "completed";

export type Weapon = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  levelUnlock: string;
  releaseOrder: number;
};
