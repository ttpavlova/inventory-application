import type { ShoeBody } from "../schemas/schemas";
import type { FilterOptions, ShoeBodyView } from "./types";

export type FormData = {
  [k in keyof ShoeBody]: ShoeBody[k] | null;
};

export type FormFields = {
  field: keyof ShoeBody;
  label: keyof ShoeBodyView;
  options: FilterOptions;
};
