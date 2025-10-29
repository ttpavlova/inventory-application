import { Router } from "express";
import { itemsListGet } from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.get("/", itemsListGet);

export { indexRouter };
