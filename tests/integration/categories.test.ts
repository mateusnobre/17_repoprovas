import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createCategory } from "../factories/categoryFactory";
import { clearCategories, clearCourses, clearExams } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearExams();
  await clearCourses();
  await clearCategories();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /categories", () => {
  it("should answer with status 200", async () => {
    const category = await createCategory();
    const response = await supertest(app).get("/categories");
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: category.name
        })
      ])
    );

    expect(response.status).toBe(200);
  });
});

describe("POST /categories", () => {
  it("should answer with status 201", async () => {
    const category = {name: "some random name"}
    const response = await supertest(app).post("/categories").send(category);
    expect(response.status).toBe(201);
  });
});



