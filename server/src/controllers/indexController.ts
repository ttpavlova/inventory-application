import type { Request, Response } from "express";

function getGreetingPage(req: Request, res: Response) {
  res.render("index", {
    title: "Index page",
  });
}

export { getGreetingPage };
