import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createLecturer } from "../factories/lecturerFactory";
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

describe("GET /lecturers", () => {
  it("should answer with status 200", async () => {
    const lecturer = await createLecturer();

    const response = await supertest(app).get("/lecturers");
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: lecturer.name
        })
      ])
    );

    expect(response.status).toBe(200);
  });
});


describe("POST /lecturers", () => {
  it("should answer with status 201", async () => {
    const lecturer = {name: "some random name"}
    const response = await supertest(app).post("/lecturers").send(lecturer);
    expect(response.status).toBe(201);
  });
});