import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as categoryController from "./controllers/categoryController";
import * as lecturerController from './controllers/lecturerController'
import * as courseController from './controllers/courseController'
import router from './routers/Router'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', router)

app.get("/categories", categoryController.getCategories);
app.get("/lecturers", lecturerController.getLecturers);
app.get("/courses", courseController.getCourses);

app.post("/categories", categoryController.postCategory);
app.post("/lecturers", lecturerController.postLecturer);
app.post("/courses", courseController.postCourse);

export async function init () {
  await connectDatabase();
}

export default app;
