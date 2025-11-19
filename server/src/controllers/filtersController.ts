import type { Request, Response } from "express";
import { getAllCategoriesQuery } from "~/db/categoriesQueries.js";
import {
  getAllBrandsQuery,
  getAllColorsQuery,
  getAllMaterialsQuery,
} from "../db/filtersQueries.js";
import type { ResponseBodyFilters } from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse .js";

async function getAllFilters(req: Request, res: Response<ResponseBodyFilters>) {
  try {
    const [categories, brands, materials, colors] = await Promise.all([
      getAllCategoriesQuery(),
      getAllBrandsQuery(),
      getAllMaterialsQuery(),
      getAllColorsQuery(),
    ]);

    res.status(200).json({
      data: {
        categories,
        brands,
        materials,
        colors,
      },
    });
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
