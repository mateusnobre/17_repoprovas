import { Request, Response } from "express";

import * as lecturerService from "../services/lecturerService";

export async function getLecturers (req: Request, res: Response) {
  try {
    const lecturers = await lecturerService.getLecturers();
    res.status(200).send(lecturers);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function postLecturer (req: Request, res: Response) {
  try {
    const lecturer = await lecturerService.postLecturer(req.body.name);
    res.status(201).send(lecturer);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
