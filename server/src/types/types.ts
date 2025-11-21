import type { ShoeBodyRequest, CategoryBody } from "../schemas/schemas.js";

export interface ShoeParams {
  id: number;
}

export const GENDERS = ["Men", "Women"] as const;
export const SEASONS = ["Summer", "Winter", "Demi-season"] as const;

export type GenderType = (typeof GENDERS)[number];
export type SeasonType = (typeof SEASONS)[number];

// shape for data mutation
// same as ShoeBodyRequest from schemas.ts
// export interface ShoeBodyRequest {
//   gender: GenderType;
//   season: SeasonType;
//   categoryId: number;
//   brandId: number;
//   materialId: number;
//   colorId: number;
// }

// shape for returning a list of data
export interface ShoeBodyResponse {
  gender: GenderType;
  season: SeasonType;
  category: string;
  brand: string;
  material: string;
  color: string;
}

export type ShoeRequest = ShoeParams & ShoeBodyRequest;
export type ShoeResponse = ShoeParams & ShoeBodyResponse;

export type ShoeId = ShoeParams["id"];

export interface CategoryParams {
  id: number;
}

// same as CategoryBody from schemas.ts
// export interface CategoryBody {
//   name: string;
// }

export type Category = CategoryParams & CategoryBody;

export type CategoryId = CategoryParams["id"];

export type CategoryName = CategoryBody["name"];

export type NoParams = Record<string, never>;

interface SuccessResponse<T> {
  data: T;
}

interface SuccessGetListResponse<T> extends SuccessResponse<T> {
  totalItems?: number;
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

interface ValidationErrors<T> {
  errors: FlattenedErrors<T>;
}

export type ListResponseBody<T> =
  | SuccessGetListResponse<T>
  | ErrorResponse
  | NotFoundError;

export type ItemResponseBody<T> =
  | SuccessResponse<T>
  | ErrorResponse
  | NotFoundError;

export type MutationResponseBody<T, A> =
  | SuccessResponse<T>
  | ErrorResponse
  | NotFoundError
  | ValidationErrors<A>;

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

export interface Filters {
  genders: Gender[];
  seasons: Season[];
  categories: Category[];
  brands: Filter[];
  materials: Filter[];
  colors: Filter[];
}
