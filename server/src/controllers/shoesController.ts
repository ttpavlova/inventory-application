import type { Request, Response } from "express";
import {
  getAllShoesQuery,
  getShoeByIdQuery,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
} from "../db/queries.js";
import type { ShoeParams } from "../types/types.js";

async function getAllShoes(req: Request, res: Response) {
  const shoes = await getAllShoesQuery();

  res.json({ shoes });
}

async function getShoeById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Shoe ID is required" });
  }

  try {
    const shoe = await getShoeByIdQuery(id);

    if (!shoe) {
      return res.status(404).json({ error: "Shoe not found" });
    }

    res.json(shoe);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createShoe(req: Request, res: Response) {
  const { ...shoeData }: ShoeParams = req.body;

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

async function updateShoe(req: Request, res: Response) {
  const { id } = req.params;
  const { ...shoeData }: ShoeParams = req.body;

  if (!id) {
    return res.status(400).json({ error: "Shoe ID is required" });
  }

  try {
    const newShoe = await updateShoeQuery(id, shoeData);

    if (!newShoe) {
      return res.status(404).json({ error: "Shoe not found" });
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

async function deleteShoe(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Shoe ID is required" });
  }

  try {
    const deletedShoe = await deleteShoeQuery(id);

    if (!deletedShoe) {
      return res.status(404).json({ error: "Shoe not found" });
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
