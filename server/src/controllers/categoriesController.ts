import type { Request, Response } from "express";
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
  CategoryFilterByName,
  CategoryParams,
  NoParams,
  ResponseBody,
} from "../types/types.js";

async function getAllCategories(
  req: Request,
  res: Response<ResponseBody<Category[]>>
) {
  try {
    const categories = await getAllCategoriesQuery();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to get a list of shoes",
      error: error instanceof Error ? error.message : error,
    });
  }
}

async function createCategory(
  req: Request<NoParams, ResponseBody<Category>, CategoryBody>,
  res: Response<ResponseBody<Category>>
) {
  const { ...categoryData } = req.body;

  try {
    const newCategory = await createCategoryQuery(categoryData);

    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to create a category",
      error: error instanceof Error ? error.message : error,
    });
  }
}
async function updateCategory(
  req: Request<CategoryParams, ResponseBody<Category>, CategoryBody>,
  res: Response<ResponseBody<Category>>
) {
  const { id } = req.params;
  const { ...categoryData } = req.body;

  try {
    const newCategory = await updateCategoryQuery(id, categoryData);

    if (!newCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to update a category",
      error: error instanceof Error ? error.message : error,
    });
  }
}

async function deleteCategory(
  req: Request<CategoryParams>,
  res: Response<ResponseBody<Category>>
) {
  const { id } = req.params;

  try {
    const deletedCategory = await deleteCategoryQuery(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to delete a category",
      error: error instanceof Error ? error.message : error,
    });
  }
}

async function getShoesByCategory(
  req: Request<CategoryFilterByName>,
  res: Response<ResponseBody<Category[]>>
) {
  const { name } = req.params;

  try {
    const shoes = await getShoesByCategoryQuery(name);

    if (shoes.length === 0) {
      return res
        .status(404)
        .json({ message: `Shoes by category ${name} not found` });
    }

    res.status(200).json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to get shoes by category",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getShoesByCategory,
};
