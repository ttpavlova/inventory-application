import type { ShoeBody } from "../schemas/schemas";
import type { FilterOptions, ShoeListItemDto } from "./types";

export type FormData = {
  [k in keyof ShoeBody]: ShoeBody[k] | null;
};

type ShoeListItemFields = Omit<ShoeListItemDto, "id">;

export type FormFields = {
  field: keyof ShoeBody;
  label: keyof ShoeListItemFields;
  options: FilterOptions;
};

export type FlattenedErrors<T> = {
  [K in keyof T]?: string[];
};
