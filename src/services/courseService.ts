import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Course from "../entities/Course";
import Lecturer from "../entities/Lecturer";

export async function getCourses () {
  const courses = await getRepository(Course).find({
    select: ["id", "name"],
    relations:  ['lecturer']
  });
  
  return courses;
}

export async function postCourse (name: string, lecturerId: number) {
  const lecturer = await getRepository(Lecturer).findOne({
    where: { id: lecturerId },
    relations: ['courses']
  });
  const course = await getRepository(Course).create({
    name: name
  });
  lecturer.courses.push(course)
  await getRepository(Course).save(course);
  await getRepository(Lecturer).save(lecturer);
  return course;
}