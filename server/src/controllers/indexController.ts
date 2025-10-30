import type { Request, Response } from "express";
import { getAllShoes } from "../db/queries.js";

async function shoesListGet(req: Request, res: Response) {
  const shoes = await getAllShoes();

  res.json(shoes);
}

function getGreetingPage(req: Request, res: Response) {
  res.render("index", {
    title: "Index page",
  });
}

export { shoesListGet, getGreetingPage };
