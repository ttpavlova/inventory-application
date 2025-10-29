import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { indexRouter } from "./routes/indexRouter.js";

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("views", join(__dirname, "../src/views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

// Здесь мы настраиваем API роуты
app.get("/api/hello", (req, res) => {
  res.json({ message: "Привет из Express!" });
});

// Результат сборки React-приложения будет размещаться в dist
app.use(express.static(join(__dirname, "../../client/dist")));

// Все остальные запросы (кроме /api) отдаём index.html React
app.get("/{*any}", (req, res) => {
  res.sendFile(join(__dirname, "../../client/dist", "index.html"));
});

export default app;
