import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
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
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";

const getLengthErr = (max: number) => `must be between 1 and ${max} characters`;

const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Category ${getLengthErr(50)}`),
];

async function getAllCategories(
  req: Request,
  res: Response<ResponseBody<Category[]>>
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

const createCategory = [
  ...validateCategory,
  async (
    req: Request<NoParams, ResponseBody<Category>, CategoryBody>,
    res: Response<ResponseBody<Category>>
  ) => {
    const { ...categoryData } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
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
          buildErrorResponse(
            "Database error: failed to create a category",
            error
          )
        );
    }
  },
];

const updateCategory = [
  ...validateCategory,
  async (
    req: Request<CategoryParams, ResponseBody<Category>, CategoryBody>,
    res: Response<ResponseBody<Category>>
  ) => {
    const { id } = req.params;
    const { ...categoryData } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
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
          buildErrorResponse(
            "Database error: failed to update a category",
            error
          )
        );
    }
  },
];

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
  req: Request<CategoryFilterByName>,
  res: Response<ResponseBody<Category[]>>
) {
  const { name } = req.params;

  try {
    const shoes = await getShoesByCategoryQuery(name);

    if (shoes.length === 0) {
      return res.status(404).json({
        message: `Shoes by category ${name} not found`,
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
