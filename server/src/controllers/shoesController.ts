import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  getAllShoesQuery,
  getShoeByIdQuery,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
} from "../db/shoesQueries.js";
import type {
  NoParams,
  ResponseBody,
  Shoe,
  ShoeBody,
  ShoeParams,
} from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse .js";

const invalidErr = "Invalid";
const getLengthErr = (max: number) => `must be between 1 and ${max} characters`;

const validateShoe = [
  body("gender")
    .trim()
    .isIn(["Men", "Women"])
    .withMessage(`${invalidErr} gender`),
  body("season")
    .trim()
    .isIn(["Summer", "Winter", "Demi-season"])
    .withMessage(`${invalidErr} season`),
  body("category")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Category ${getLengthErr(50)}`),
  body("brand")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Brand ${getLengthErr(50)}`),
  body("material")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Material ${getLengthErr(50)}`),
  body("color")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Color ${getLengthErr(30)}`),
  body("country")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Country ${getLengthErr(30)}`),
];

async function getAllShoes(req: Request, res: Response<ResponseBody<Shoe[]>>) {
  try {
    const shoes = await getAllShoesQuery();

    res.status(200).json({
      data: shoes,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse(
          "Database error: failed to get a list of shoes",
          error
        )
      );
  }
}

async function getShoeById(
  req: Request<ShoeParams>,
  res: Response<ResponseBody<Shoe>>
) {
  const { id } = req.params;

  try {
    const shoe = await getShoeByIdQuery(id);

    if (!shoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({
      data: shoe,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to get a shoe by id", error)
      );
  }
}

const createShoe = [
  ...validateShoe,
  async (
    req: Request<NoParams, ResponseBody<Shoe>, ShoeBody>,
    res: Response<ResponseBody<Shoe>>
  ) => {
    const { ...shoeData } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const newShoe = await createShoeQuery(shoeData);

      res.status(201).json({
        data: newShoe,
      });
    } catch (error) {
      res
        .status(500)
        .json(
          buildErrorResponse("Database error: failed to create a shoe", error)
        );
    }
  },
];
const updateShoe = [
  ...validateShoe,
  async (
    req: Request<ShoeParams, ResponseBody<Shoe>, ShoeBody>,
    res: Response<ResponseBody<Shoe>>
  ) => {
    const { id } = req.params;
    const { ...shoeData } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const newShoe = await updateShoeQuery(id, shoeData);

      if (!newShoe) {
        return res.status(404).json({ message: "Shoe not found" });
      }

      res.status(200).json({
        data: newShoe,
      });
    } catch (error) {
      res
        .status(500)
        .json(
          buildErrorResponse("Database error: failed to update a shoe", error)
        );
    }
  },
];

async function deleteShoe(
  req: Request<ShoeParams>,
  res: Response<ResponseBody<Shoe>>
) {
  const { id } = req.params;

  try {
    const deletedShoe = await deleteShoeQuery(id);

    if (!deletedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({
      data: deletedShoe,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to delete a shoe", error)
      );
  }
}

export { getAllShoes, getShoeById, createShoe, updateShoe, deleteShoe };
