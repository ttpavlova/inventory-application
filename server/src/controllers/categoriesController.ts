import type { Request, Response } from "express";
import { z } from "zod";
import {
  createCategoryQuery,
  deleteCategoryQuery,
  getAllCategoriesQuery,
  getShoesByCategoryQuery,
  updateCategoryQuery,
} from "../db/categoriesQueries.js";
import type {
  Category,
  CategoryBody,
  CategoryParams,
  ItemResponseBody,
  ListResponseBody,
  MutationResponseBody,
  NoParams,
} from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";

const Category = z.object({
  name: z.string().min(1).max(50),
});

type CategoryType = z.infer<typeof Category>;

async function getAllCategories(
  req: Request,
  res: Response<ListResponseBody<Category[]>>
) {
  try {
    const categories = await getAllCategoriesQuery();

    res.status(200).json({
      data: categories,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse(
          "Database error: failed to get a list of categories",
          error
        )
      );
  }
}

async function createCategory(
  req: Request<
    NoParams,
    MutationResponseBody<Category, CategoryType>,
    CategoryBody
  >,
  res: Response<MutationResponseBody<Category, CategoryType>>
) {
  const { ...categoryData } = req.body;

  const validatedFields = Category.safeParse(categoryData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
    });
  }

  try {
    const newCategory = await createCategoryQuery(categoryData);

    res.status(201).json({
      data: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to create a category", error)
      );
  }
}

async function updateCategory(
  req: Request<
    CategoryParams,
    MutationResponseBody<Category, CategoryType>,
    CategoryBody
  >,
  res: Response<MutationResponseBody<Category, CategoryType>>
) {
  const { id } = req.params;
  const { ...categoryData } = req.body;

  const validatedFields = Category.safeParse(categoryData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
    });
  }

  try {
    const newCategory = await updateCategoryQuery(id, categoryData);

    if (!newCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      data: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to update a category", error)
      );
  }
}

async function deleteCategory(
  req: Request<CategoryParams>,
  res: Response<ItemResponseBody<Category>>
) {
  const { id } = req.params;

  try {
    const deletedCategory = await deleteCategoryQuery(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      data: deletedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to delete a category", error)
      );
  }
}

async function getShoesByCategory(
  req: Request<CategoryParams>,
  res: Response<ListResponseBody<Category[]>>
) {
  const { id } = req.params;

  try {
    const shoes = await getShoesByCategoryQuery(id);

    if (shoes.length === 0) {
      return res.status(404).json({
        message: `Shoes by category ${id} not found`,
      });
    }

    res.status(200).json({
      data: shoes,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse(
          "Database error: failed to get shoes by category",
          error
        )
      );
  }
}

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getShoesByCategory,
};
