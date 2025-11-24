import { z } from "zod";
import { GENDERS, SEASONS } from "../constants/constants.js";

const ShoeBodySchema = z.object({
  gender: z.enum(GENDERS),
  season: z.enum(SEASONS),
  categoryId: z.number(),
  brandId: z.number(),
  materialId: z.number(),
  colorId: z.number(),
});

type ShoeBody = z.infer<typeof ShoeBodySchema>;

const CategoryBodySchema = z.object({
  name: z.string().min(1).max(50),
});

type CategoryBody = z.infer<typeof CategoryBodySchema>;

export { ShoeBodySchema, type ShoeBody, CategoryBodySchema, type CategoryBody };
