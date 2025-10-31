import type { Request, Response } from "express";
import {
  getAllCategoriesQuery,
  getShoesByCategoryQuery,
} from "../db/categoriesQueries.js";

async function getAllCategories(req: Request, res: Response) {
  const categories = await getAllCategoriesQuery();

  res.json({ categories });
}

async function getShoesByCategory(req: Request, res: Response) {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const shoes = await getShoesByCategoryQuery(name);

    if (shoes.length === 0) {
      return res
        .status(404)
        .json({ error: `Shoes by category ${name} not found` });
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

async function createCategory() {}
async function updateCategory() {}
async function deleteCategory() {}

export {
  getAllCategories,
  getShoesByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
