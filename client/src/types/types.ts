export interface Category {
  id: string;
  name: string;
}

export interface Shoe {
  id: string;
  gender: string;
  season: string;
  category: string;
  brand: string;
  material: string;
  color: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ResponseParams<T> {
  data: T;
  totalItems: number;
}

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

export interface ResponseParamsFilters {
  data: Filters;
}
