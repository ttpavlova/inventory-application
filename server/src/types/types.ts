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

export type ShoeId = Shoe["id"];

export interface ShoeDetailsDto {
  id: number;
  gender: Gender;
  season: Season;
  category: Category;
  brand: Filter;
  material: Filter;
  color: Filter;
}

export interface ShoeDbWithRelations {
  id: number;
  gender: Gender;
  season: Season;
  category_id: number;
  category_name: string;
  brand_id: number;
  brand_name: string;
  material_id: number;
  material_name: string;
  color_id: number;
  color_name: string;
}

export type ShoeBodyMutation = Omit<ShoeBody, "gender" | "categoryId"> & {
  genderCategoryId: number;
};

export interface Category extends CategoryBody {
  id: number;
}

export type CategoryId = Category["id"];

interface ParamsWithId {
  id: number;
}

export type ShoeParams = ParamsWithId;
export type CategoryParams = ParamsWithId;

interface List<T> {
  items: T[];
  totalCount: number;
}

interface ErrorResponse {
  message: string;
  error?: unknown;
}

interface NotFoundError {
  message: string;
}

type FlattenedErrors<T> = {
  [K in keyof T]?: string[];
};

interface ValidationErrors<TBody> {
  errors: FlattenedErrors<TBody>;
}

export type GetListResponse<T> = List<T> | ErrorResponse; // for lists with pagination
export type GetResponse<T> = T | ErrorResponse | NotFoundError; // for lists where pagination isn't needed and items
export type PostResponse<T, TBody> =
  | T
  | ErrorResponse
  | ValidationErrors<TBody>;
export type PutResponse<T, TBody> =
  | T
  | ErrorResponse
  | NotFoundError
  | ValidationErrors<TBody>;
export type DeleteResponse = ErrorResponse | NotFoundError;

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

export type ParsedFilterParams = {
  [k in keyof Filters]?: string[];
};
