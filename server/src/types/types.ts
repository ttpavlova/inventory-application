import {
  GENDER_OPTIONS,
  GENDERS,
  SEASON_OPTIONS,
  SEASONS,
} from "../constants/constants.js";
import type { ShoeBody, CategoryBody } from "../schemas/schemas.js"; // shapes for data mutation

export interface ShoeParams {
  id: number;
}

export type Gender = (typeof GENDERS)[number];
export type Season = (typeof SEASONS)[number];
export type GenderOptions = typeof GENDER_OPTIONS;
export type SeasonOptions = typeof SEASON_OPTIONS;

// shape for returning a list of data
export interface ShoeBodyView {
  gender: Gender;
  season: Season;
  category: string;
  brand: string;
  material: string;
  color: string;
}

export type Shoe = ShoeParams & ShoeBody;
export type ShoeView = ShoeParams & ShoeBodyView;

export type ShoeId = ShoeParams["id"];

export type ShoeWithRelations = {
  id: number;
  gender: Gender;
  season: Season;
  category: Category;
  brand: Filter;
  material: Filter;
  color: Filter;
};

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

export interface CategoryParams {
  id: number;
}

export type Category = CategoryParams & CategoryBody;

export type CategoryId = CategoryParams["id"];

export type CategoryName = CategoryBody["name"];

export type NoParams = Record<string, never>;

export interface List<T> {
  items: T;
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
// export type GetResponse<T> = T | ErrorResponse; // for lists where pagination isn't needed
// export type GetItemResponse<T> = T | ErrorResponse | NotFoundError; // for items
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
