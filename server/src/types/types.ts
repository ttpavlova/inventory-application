import { GENDERS, SEASONS } from "../constants/constants.js";
import type { ShoeBody, CategoryBody } from "../schemas/schemas.js"; // shapes for data mutation

export interface ShoeParams {
  id: number;
}

export type GenderType = (typeof GENDERS)[number];
export type SeasonType = (typeof SEASONS)[number];

// shape for returning a list of data
export interface ShoeBodyView {
  gender: GenderType;
  season: SeasonType;
  category: string;
  brand: string;
  material: string;
  color: string;
}

export type Shoe = ShoeParams & ShoeBody;
export type ShoeView = ShoeParams & ShoeBodyView;

export type ShoeId = ShoeParams["id"];

export interface CategoryParams {
  id: number;
}

export type Category = CategoryParams & CategoryBody;

export type CategoryId = CategoryParams["id"];

export type CategoryName = CategoryBody["name"];

export type NoParams = Record<string, never>;

interface List<T> {
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

interface ValidationErrors<T> {
  errors: FlattenedErrors<T>;
}

export type GetListResponse<T> = List<T> | ErrorResponse; // for lists with pagination
export type GetResponse<T> = T | ErrorResponse | NotFoundError; // for lists where pagination isn't needed and items
export type PostResponse<T, A> = T | ErrorResponse | ValidationErrors<A>;
export type PutResponse<T, A> =
  | T
  | ErrorResponse
  | NotFoundError
  | ValidationErrors<A>;
export type DeleteResponse = ErrorResponse | NotFoundError;

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
