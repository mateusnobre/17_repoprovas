import { Request, Response } from "express";

import * as courseService from "../services/courseService";

export async function getCourses (req: Request, res: Response) {
  try {
    const courses = await courseService.getCourses();
    res.status(200).send(courses);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function postCourse (req: Request, res: Response) {
  try {
    const course = await courseService.postCourse(req.body.name, req.body.lecturerId);
    res.status(201).send(course);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
