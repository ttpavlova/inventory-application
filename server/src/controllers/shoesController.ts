import type { Request, Response } from "express";
import {
  editShoe,
  getAllShoes,
  getShoeById,
  insertShoe,
} from "../db/queries.js";
import type { ShoeParams } from "../types/types.js";

async function getShoeList(req: Request, res: Response) {
  const shoes = await getAllShoes();

  res.json({ shoes });
}

async function getShoeDetail(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Shoe ID is required" });
  }

  try {
    const shoe = await getShoeById(id);

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
    const newShoe = await insertShoe(shoeData);

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
    const newShoe = await editShoe(id, shoeData);

    res.status(201).json({
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

async function deleteShoe(req: Request, res: Response) {}

export { getShoeList, getShoeDetail, createShoe, updateShoe, deleteShoe };
