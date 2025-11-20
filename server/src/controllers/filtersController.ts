import type { Request, Response } from "express";
import { getAllCategoriesQuery } from "~/db/categoriesQueries.js";
import {
  getAllBrandsQuery,
  getAllColorsQuery,
  getAllMaterialsQuery,
} from "../db/filtersQueries.js";
import { type Filters, type ListResponseBody } from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";
import { genders, seasons } from "../helpers/getFilters.js";

async function getAllFilters(
  req: Request,
  res: Response<ListResponseBody<Filters>>
) {
  try {
    const [categories, brands, materials, colors] = await Promise.all([
      getAllCategoriesQuery(),
      getAllBrandsQuery(),
      getAllMaterialsQuery(),
      getAllColorsQuery(),
    ]);

    res.status(200).json({
      data: {
        genders,
        seasons,
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
