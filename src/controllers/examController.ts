import { Request, Response } from "express";

import * as examService from "../services/examService";

export async function getExams (req: Request, res: Response) {
  try {
    const exams = await examService.getExams();
    res.status(200).send(exams);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function postExam (req: Request, res: Response) {
  try {
    const exam = await examService.postExam(req.body.name, req.body.url, req.body.courseId, req.body.categoryId);
    res.status(201).send(exam);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
