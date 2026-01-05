import {
  GENDER_OPTIONS,
  GENDERS,
  SEASON_OPTIONS,
  SEASONS,
} from "../constants/constants.js";
import type { ShoeBody, CategoryBody } from "../schemas/schemas.js";

export type Gender = (typeof GENDERS)[number];
export type Season = (typeof SEASONS)[number];
export type GenderOptions = typeof GENDER_OPTIONS;
export type SeasonOptions = typeof SEASON_OPTIONS;

export interface Shoe extends ShoeBody {
  id: number;
}

export interface ShoeListItemDto {
  id: number;
  gender: Gender;
  season: Season;
  category: string;
  brand: string;
  material: string;
  color: string;
}

export type ShoeDetailsDto = {
  id: number;
  gender: Gender;
  season: Season;
  category: Category;
  brand: Filter;
  material: Filter;
  color: Filter;
};

export interface CategoryParams {
  id: number;
}

export interface Category extends CategoryBody {
  id: number;
}

export interface List<T> {
  items: T[];
  totalCount: number;
}

export interface Filter {
  id: number;
  name: string;
}

export interface Filters {
  genders: GenderOptions;
  seasons: SeasonOptions;
  categories: Category[];
  brands: Filter[];
  materials: Filter[];
  colors: Filter[];
}

export type FiltersDto = Omit<Filters, "categories"> & {
  categoriesByGender: {
    men: Category[];
    women: Category[];
  };
};

export type FilterOptions = Filters[keyof Filters];

export type FilterParams = {
  [k in keyof Filters]?: string | null;
};
