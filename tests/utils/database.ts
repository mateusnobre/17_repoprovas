import { getRepository } from "typeorm";

import Category from "../../src/entities/Category";
import Course from "../../src/entities/Course";
import Exam from "../../src/entities/Exam";
import Lecturer from "../../src/entities/Lecturer";

export async function clearDatabase () {
  await getRepository(Category).delete({});
  await getRepository(Course).delete({});
  await getRepository(Exam).delete({});
  await getRepository(Lecturer).delete({});
}
