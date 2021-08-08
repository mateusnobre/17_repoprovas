import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createExam } from "../factories/examFactory";
import { createCategory } from "../factories/categoryFactory";
import { createCourse } from "../factories/courseFactory";
import { clearExams } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearExams();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /exams", () => {
  it("should answer with status 200", async () => {
    const exam = await createExam();

    const response = await supertest(app).get("/exams");
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: exam.name,
          url: exam.url
        })
      ])
    );

    expect(response.status).toBe(200);
  });
});


describe("POST /exams", () => {
  it("should answer with status 201", async () => {
    const category = await createCategory();
    const course = await createCourse();
    const exam = {name: "some random name", url: 'https://download.inep.gov.br/educacao_basica/enem/provas/2017/cad_5_prova_amarelo_12112017.pdf', courseId: course.id, categoryId: category.id}
    const response = await supertest(app).post("/exams").send(exam);
    expect(response.status).toBe(201);
  });
});
