import { Router } from "express";
import { getAllFilters } from "../controllers/filtersController.js";
const filtersRouter = Router();

filtersRouter.get("/", getAllFilters);

export { filtersRouter };
