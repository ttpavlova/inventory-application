import { Router } from "express";
import {
  getAllShoes,
  getShoeById,
  createShoe,
  updateShoe,
  deleteShoe,
} from "../controllers/shoesController.js";
const shoesRouter = Router();

shoesRouter.get("/", getAllShoes);
shoesRouter.get("/:id", getShoeById);
shoesRouter.post("/", createShoe);
shoesRouter.put("/:id", updateShoe);
shoesRouter.delete("/:id", deleteShoe);

export { shoesRouter };
