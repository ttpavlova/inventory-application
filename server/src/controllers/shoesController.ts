import type { Request, Response } from "express";
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

async function getAllShoes(req: Request, res: Response<ResponseBody<Shoe[]>>) {
  try {
    const shoes = await getAllShoesQuery();

    res.status(200).json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to get a list of shoes",
      error: error instanceof Error ? error.message : error,
    });
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
      success: true,
      data: shoe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to get a shoe by id",
      error: error instanceof Error ? error.message : error,
    });
  }
}

async function createShoe(
  req: Request<NoParams, ResponseBody<Shoe>, ShoeBody>,
  res: Response<ResponseBody<Shoe>>
) {
  const { ...shoeData } = req.body;

  try {
    const newShoe = await createShoeQuery(shoeData);

    res.status(201).json({
      success: true,
      data: newShoe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to create a shoe",
      error: error instanceof Error ? error.message : error,
    });
  }
}

async function updateShoe(
  req: Request<ShoeParams, ResponseBody<Shoe>, ShoeBody>,
  res: Response<ResponseBody<Shoe>>
) {
  const { id } = req.params;
  const { ...shoeData } = req.body;

  try {
    const newShoe = await updateShoeQuery(id, shoeData);

    if (!newShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({
      success: true,
      data: newShoe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to update a shoe",
      error: error instanceof Error ? error.message : error,
    });
  }
}

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
      success: true,
      data: deletedShoe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error: failed to delete a shoe",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export { getAllShoes, getShoeById, createShoe, updateShoe, deleteShoe };
