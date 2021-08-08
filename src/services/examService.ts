import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Exam from "../entities/Exam";
import Category from "../entities/Category";
import Course from "../entities/Course";

export async function getExams () {
  const exams = await getRepository(Exam).find({
    select: ["id", "name", "url"],
    relations: ['course', 'category']
  });
  
  return exams;
}

export async function postExam (name: string, url: string, courseId: number, categoryId: number) {
  const course = await getRepository(Course).findOne({
    where: { id: courseId },
    relations: ['exams']
  });
  console.log(courseId);
  const category = await getRepository(Category).findOne({
    where: { id: categoryId },
    relations: ['exams']
  });
  const exam = await getRepository(Exam).create({
    name: name,
    url: url
  });
  course.exams.push(exam)
  category.exams.push(exam)
  await getRepository(Exam).save(exam);
  await getRepository(Course).save(course);
  await getRepository(Category).save(category);
  return exam;
}
