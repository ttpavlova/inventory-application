import { Router } from "express";
import { getGreetingPage } from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.get("/", getGreetingPage);

export { indexRouter };
