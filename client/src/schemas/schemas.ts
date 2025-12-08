import { z } from "zod";
import { GENDERS, SEASONS } from "../constants/constants.js";

const ShoeBodySchema = z.object({
  gender: z.enum(GENDERS, { message: "Gender should not be empty" }),
  season: z.enum(SEASONS, { message: "Season should not be empty" }),
  categoryId: z.number({ message: "Category should not be empty" }),
  brandId: z.number({ message: "Brand should not be empty" }),
  materialId: z.number({ message: "Material should not be empty" }),
  colorId: z.number({ message: "Color should not be empty" }),
});

type ShoeBody = z.infer<typeof ShoeBodySchema>;

const CategoryBodySchema = z.object({
  name: z.string().min(1).max(50),
});

type CategoryBody = z.infer<typeof CategoryBodySchema>;

export { ShoeBodySchema, type ShoeBody, CategoryBodySchema, type CategoryBody };
