import { Router } from "express";
import {
  getAllCategories,
  getShoesByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";
const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:name", getShoesByCategory);
categoriesRouter.post("/", createCategory);
categoriesRouter.put("/:id", updateCategory);
categoriesRouter.delete("/:id", deleteCategory);

export { categoriesRouter };
