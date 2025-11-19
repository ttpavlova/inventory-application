import type { ValidationError } from "express-validator";

export interface ShoeParams {
  id: string;
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

export type Shoe = ShoeParams & ShoeBody;

export type ShoeId = ShoeParams["id"];

export interface CategoryParams {
  id: string;
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

export interface Brand {
  id: string;
  name: string;
}

export interface Material {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
}

interface Filters {
  categories: Category[];
  brands: Brand[];
  materials: Material[];
  colors: Color[];
}

interface SuccessResponseFilters {
  data: Filters;
}

export type ResponseBodyFilters =
  | SuccessResponseFilters
  | ErrorResponse
  | NotFoundError
  | ValidationErrors;
