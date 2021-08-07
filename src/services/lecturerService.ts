import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Lecturer from "../entities/Lecturer";

export async function getLecturers () {
  const lecturers = await getRepository(Lecturer).find({
    select: ["id", "name"],
    relations: ['courses']
  });
  
  return lecturers;
}

export async function postLecturer (name: string) {
  const lecturer = await getRepository(Lecturer).create({
    name: name
  });
  await getRepository(Lecturer).save(lecturer);
  return lecturer;
}