import { getRepository } from "typeorm";

import Category from "../../src/entities/Category";
import Course from "../../src/entities/Course";
import Exam from "../../src/entities/Exam";
import Lecturer from "../../src/entities/Lecturer";

export async function clearCategories () {
  await getRepository(Category).delete({});
}

export async function clearCourses () {
  await getRepository(Course).delete({});
}

export async function clearExams () {
  await getRepository(Exam).delete({});
}

export async function clearLecturers () {
  await getRepository(Lecturer).delete({});
}