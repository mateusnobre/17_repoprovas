import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createExam } from "../factories/examFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
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
    const exam = {name: "some random name", url: 'https://download.inep.gov.br/educacao_basica/enem/provas/2017/cad_5_prova_amarelo_12112017.pdf'}
    const response = await supertest(app).post("/exams").send(exam);
    expect(response.status).toBe(201);
  });
});
