import { getRepository } from "typeorm";
import faker from 'faker';
import Exam from "../../src/entities/Exam";

export async function createExam () {
  const exam = await getRepository(Exam).create({
    name: faker.name.findName(),
    url: faker.internet.url()
  });

  await getRepository(Exam).save(exam);

  return exam;
}
