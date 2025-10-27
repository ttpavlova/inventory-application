import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { indexRouter } from "./routes/indexRouter.ts";

const app = express();

app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

export default app;
