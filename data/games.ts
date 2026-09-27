export type GameStatus = "public" | "hidden" | "coming_soon";

export type GameDefinition = {
  slug: string;
  name: string;
  shortName: string;
  status: GameStatus;
  description: string;
  releaseDate?: string;
};

export const games: GameDefinition[] = [
  {
    slug: "mw4",
    name: "Modern Warfare 4",
    shortName: "MW4",
    status: "public",
    description: "Track MW4 weapon progression and camos. Official launch data is added only when confirmed.",
    releaseDate: "2026-10-23"
  },
  {
    slug: "bo7",
    name: "Black Ops 7",
    shortName: "BO7",
    status: "hidden",
    description: "BO7 tracker retained privately until the dataset is complete."
  }
];

export const publicGames = games.filter((game) => game.status === "public");
export const hiddenGames = games.filter((game) => game.status === "hidden");
export const gameBySlug = new Map(games.map((game) => [game.slug, game]));