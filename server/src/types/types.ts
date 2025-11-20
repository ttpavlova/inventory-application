import type { ValidationError } from "express-validator";

export interface ShoeParams {
  id: number;
}

export interface ShoeBody {
  gender: string;
  season: string;
  category: string;
  brand: string;
  material: string;
  color: string;
}

export type Shoe = ShoeParams & ShoeBody;

export type ShoeId = ShoeParams["id"];

export interface CategoryParams {
  id: number;
}

export interface CategoryBody {
  name: string;
}

export type Category = CategoryParams & CategoryBody;

export interface CategoryFilterByName {
  name: string;
}

export type CategoryId = CategoryParams["id"];

export type CategoryName = CategoryBody["name"];

export type NoParams = Record<string, never>;

interface SuccessResponse<T> {
  data: T;
  totalItems?: number;
}

interface ErrorResponse {
  message: string;
  error?: unknown;
}

interface NotFoundError {
  message: string;
}

interface ValidationErrors {
  errors: ValidationError[];
}

export type ResponseBody<T> =
  | SuccessResponse<T>
  | ErrorResponse
  | NotFoundError
  | ValidationErrors;

// export const GENDER = {
//   MEN: "Men",
//   WOMEN: "Women",
// } as const;

// export const SEASON = {
//   SUMMER: "Summer",
//   WINTER: "Winter",
//   DEMI_SEASON: "Demi-season",
// } as const;

// export type GenderType = (typeof GENDER)[keyof typeof GENDER];
// export type SeasonType = (typeof SEASON)[keyof typeof SEASON];

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

interface Filters {
  genders: Gender[];
  seasons: Season[];
  categories: Category[];
  brands: Filter[];
  materials: Filter[];
  colors: Filter[];
}

interface SuccessResponseFilters {
  data: Filters;
}

export type ResponseBodyFilters =
  | SuccessResponseFilters
  | ErrorResponse
  | NotFoundError
  | ValidationErrors;
