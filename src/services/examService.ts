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
  const exam = await getRepository(Exam).create({
    name: name,
    url: url
  });
  await getRepository(Exam).save(exam);
  return exam;
}
