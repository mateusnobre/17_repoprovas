import { getRepository } from "typeorm";
import faker from 'faker';
import Category from "../../src/entities/Category";

export async function createCategory () {
  const category = await getRepository(Category).create({
    name: faker.name.findName(),
  });

  await getRepository(Category).save(category);
  return category;
}
