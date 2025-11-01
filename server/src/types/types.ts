export interface ShoeParams {
  gender: string;
  season: string;
  category: string;
  brand: string;
  material: string;
  color: string;
  country: string;
}

export type ShoeId = string;

export interface CategoryParams {
  id: string;
}

export interface CategoryBody {
  name: string;
}

export interface CategoryFilterByName extends CategoryBody {}

export type CategoryId = CategoryParams["id"];

export type CategoryName = CategoryBody["name"];
