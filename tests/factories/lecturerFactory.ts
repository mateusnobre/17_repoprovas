import { getRepository } from "typeorm";
import faker from 'faker';
import Lecturer from "../../src/entities/Lecturer";

export async function createLecturer () {
  const lecturer = await getRepository(Lecturer).create({
    name: faker.name.findName(),
  });

  await getRepository(Lecturer).save(lecturer);

  return lecturer;
}
