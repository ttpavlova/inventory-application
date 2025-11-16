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
}
