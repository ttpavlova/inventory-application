export const GENDERS = ["Men", "Women"] as const;
export const SEASONS = ["Summer", "Winter", "Demi-season"] as const;

export const GENDER_OPTIONS = [
  { id: "Men", name: "Men" },
  { id: "Women", name: "Women" },
] as const;

export const GENDER_KEY_MAP: Record<"Men" | "Women", "men" | "women"> = {
  Men: "men",
  Women: "women",
};

export const SEASON_OPTIONS = [
  { id: "Summer", name: "Summer" },
  { id: "Winter", name: "Winter" },
  { id: "Demi-season", name: "Demi-season" },
] as const;
