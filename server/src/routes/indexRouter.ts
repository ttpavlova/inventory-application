import { Router } from "express";
import {
  getGreetingPage,
  shoesListGet,
} from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.get("/api/shoes", shoesListGet);
indexRouter.get("/", getGreetingPage);

export { indexRouter };
