import { z } from "zod";
import { GENDERS, SEASONS } from "../types/types.js";

const ShoeBodyRequestSchema = z.object({
  gender: z.enum(GENDERS),
  season: z.enum(SEASONS),
  categoryId: z.number(),
  brandId: z.number(),
  materialId: z.number(),
  colorId: z.number(),
});

type ShoeBodyRequest = z.infer<typeof ShoeBodyRequestSchema>;

const CategoryBodySchema = z.object({
  name: z.string().min(1).max(50),
});

type CategoryBody = z.infer<typeof CategoryBodySchema>;

export {
  ShoeBodyRequestSchema,
  type ShoeBodyRequest,
  CategoryBodySchema,
  type CategoryBody,
};
