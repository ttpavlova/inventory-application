import type { Request, Response } from "express";
import { getAllShoes, getShoeById } from "../db/queries.js";
import type { ShoeParams } from "./shoesController.interface.js";

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

    if (shoe === null) {
      return res.status(404).json({ error: "Shoe not found" });
    }

    res.json(shoe);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createShoe(req: Request, res: Response) {
  const {
    gender,
    season,
    category,
    brand,
    material,
    color,
    country,
  }: ShoeParams = req.body;
  res.json({ category });
}

async function updateShoe(req: Request, res: Response) {}

async function deleteShoe(req: Request, res: Response) {}

export { getShoeList, getShoeDetail, createShoe, updateShoe, deleteShoe };
