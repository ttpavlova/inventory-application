export interface Category {
  id: number;
  name: string;
}

export interface ShoeBody {
  gender: string;
  season: string;
  category: string;
  brand: string;
  material: string;
  color: string;
  country: string;
}

export interface Shoe extends ShoeBody {
  id: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ResponseParams<T> {
  data: T;
  totalItems: number;
}

export const GENDERS = ["Men", "Women"] as const;
export const SEASONS = ["Summer", "Winter", "Demi-season"] as const;

export type GenderType = (typeof GENDERS)[number];
export type SeasonType = (typeof SEASONS)[number];

export interface Filter {
  id: number;
  name: string;
}

export interface Gender extends Filter {
  name: GenderType;
}

export interface Season extends Filter {
  name: SeasonType;
}

export type FilterOptions = Gender[] | Season[] | Category[] | Filter[];

interface Filters {
  genders: Gender[];
  seasons: Season[];
  categories: Category[];
  brands: Filter[];
  materials: Filter[];
  colors: Filter[];
}

export interface ResponseParamsFilters {
  data: Filters;
}
