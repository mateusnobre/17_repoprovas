import { Request, Response } from "express";

import * as categoryService from "../services/categoryService";

export async function getCategories (req: Request, res: Response) {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).send(categories);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function postCategory (req: Request, res: Response) {
  try {
    const category = await categoryService.postCategory(req.body.name);
    res.status(201).send(category);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
