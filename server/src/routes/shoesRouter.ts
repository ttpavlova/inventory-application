import { Router } from "express";
import {
  createShoe,
  deleteShoe,
  getShoeDetail,
  getShoeList,
  updateShoe,
} from "../controllers/shoesController.js";
const shoesRouter = Router();

shoesRouter.get("/", getShoeList);
shoesRouter.get("/:id", getShoeDetail);
shoesRouter.post("/", createShoe);
shoesRouter.put("/:id", updateShoe);
shoesRouter.delete("/:id", deleteShoe);

export { shoesRouter };
