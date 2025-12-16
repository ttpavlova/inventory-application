import type { Request, Response } from "express";
import { getAllCategoriesQuery } from "../db/categoriesQueries.js";
import {
  getAllBrandsQuery,
  getAllColorsQuery,
  getAllMaterialsQuery,
} from "../db/filtersQueries.js";
import { type Filters, type GetResponse } from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";
import { GENDER_OPTIONS, SEASON_OPTIONS } from "../constants/constants.js";

async function getAllFilters(
  req: Request,
  res: Response<GetResponse<Filters>>
) {
  try {
    const [menCategories, womenCategories, brands, materials, colors] =
      await Promise.all([
        getAllCategoriesQuery({ genders: ["Men"] }),
        getAllCategoriesQuery({ genders: ["Women"] }),
        getAllBrandsQuery(),
        getAllMaterialsQuery(),
        getAllColorsQuery(),
      ]);

    const genders = GENDER_OPTIONS;
    const seasons = SEASON_OPTIONS;

    const filters = {
      genders,
      seasons,
      categoriesByGender: {
        men: menCategories,
        women: womenCategories,
      },
      brands,
      materials,
      colors,
    };

    res.status(200).json(filters);
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse(
          "Database error: failed to get a list of filters",
          error
        )
      );
  }
}

export { getAllFilters };
