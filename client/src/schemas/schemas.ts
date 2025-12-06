import { z } from "zod";
import { GENDERS, SEASONS } from "../constants/constants.js";

const ShoeBodySchema = z.object({
  gender: z.enum(GENDERS, { message: "Please select a gender" }),
  season: z.enum(SEASONS, { message: "Please select a season" }),
  categoryId: z.number({ message: "Please select a category" }),
  brandId: z.number({ message: "Please select a brand" }),
  materialId: z.number({ message: "Please select a material" }),
  colorId: z.number({ message: "Please select a color" }),
});

type ShoeBody = z.infer<typeof ShoeBodySchema>;

const CategoryBodySchema = z.object({
  name: z.string().min(1).max(50),
});

type CategoryBody = z.infer<typeof CategoryBodySchema>;

export { ShoeBodySchema, type ShoeBody, CategoryBodySchema, type CategoryBody };
