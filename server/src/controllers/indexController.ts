import type { Request, Response } from "express";

function itemsListGet(req: Request, res: Response) {
  res.render("index", {
    title: "Items list",
  });
}

export { itemsListGet };
