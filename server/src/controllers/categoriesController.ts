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
  CategoryParams,
  DeleteResponse,
  GetResponse,
  NoParams,
  PostResponse,
  PutResponse,
} from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";
import { CategoryBodySchema, type CategoryBody } from "../schemas/schemas.js";

async function getAllCategories(
  req: Request,
  res: Response<GetResponse<Category[]>>
) {
  const { gender } = req.query;

  try {
    const filters = { genders: gender?.toString().split(",") || [] };
    const categories = await getAllCategoriesQuery(filters);

    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Error: failed to get a list of categories", error)
      );
  }
}

async function createCategory(
  req: Request<NoParams, PostResponse<Category, CategoryBody>, CategoryBody>,
  res: Response<PostResponse<Category, CategoryBody>>
) {
  const { ...categoryData } = req.body;

  const validatedFields = CategoryBodySchema.safeParse(categoryData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
    });
  }

  try {
    const newCategory = await createCategoryQuery(categoryData);

    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to create a category", error));
  }
}

async function updateCategory(
  req: Request<
    CategoryParams,
    PutResponse<Category, CategoryBody>,
    CategoryBody
  >,
  res: Response<PutResponse<Category, CategoryBody>>
) {
  const { id } = req.params;
  const { ...categoryData } = req.body;

  const validatedFields = CategoryBodySchema.safeParse(categoryData);
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

    res.status(200).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to update a category", error));
  }
}

async function deleteCategory(
  req: Request<CategoryParams>,
  res: Response<DeleteResponse>
) {
  const { id } = req.params;

  try {
    const deletedCategory = await deleteCategoryQuery(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to delete a category", error));
  }
}

async function getShoesByCategory(
  req: Request<CategoryParams>,
  res: Response<GetResponse<Category[]>>
) {
  const { id } = req.params;

  try {
    const shoes = await getShoesByCategoryQuery(id);

    if (shoes.length === 0) {
      return res.status(404).json({
        message: `Shoes by category ${id} not found`,
      });
    }

    res.status(200).json(shoes);
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Error: failed to get shoes by category", error)
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
