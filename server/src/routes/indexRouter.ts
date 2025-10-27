import { Router } from "express";
import { itemsListGet } from "../controllers/indexController.ts";
const indexRouter = Router();

indexRouter.get("/", itemsListGet);

export { indexRouter };
