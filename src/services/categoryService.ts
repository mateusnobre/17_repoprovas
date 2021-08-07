import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Category from "../entities/Category";

export async function getCategories () {
  const categories = await getRepository(Category).find({
    select: ["id", "name"]
  });
  
  return categories;
}


export async function postCategory (name: string) {
  const category = await getRepository(Category).create({
    name: name
  });
  await getRepository(Category).save(category);
  return category;
}