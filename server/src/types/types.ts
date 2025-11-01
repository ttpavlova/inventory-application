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

export type ShoeId = ShoeParams["id"];

export interface CategoryParams {
  id: string;
}

export interface CategoryBody {
  name: string;
}

export interface CategoryFilterByName extends CategoryBody {}

export type CategoryId = CategoryParams["id"];

export type CategoryName = CategoryBody["name"];

export type NoParams = Record<string, never>;
