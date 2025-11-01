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
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: unknown;
}

interface NotFoundError {
  message: string;
}

export type ResponseBody<T> =
  | SuccessResponse<T>
  | ErrorResponse
  | NotFoundError;
