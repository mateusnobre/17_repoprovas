import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createCourse} from "../factories/courseFactory";
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

describe("GET /courses", () => {
  it("should answer with status 200", async () => {
    const course = await createCourse();

    const response = await supertest(app).get("/courses");
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: course.name
        })
      ])
    );

    expect(response.status).toBe(200);
  });
});

describe("POST /courses", () => {
  it("should answer with status 201", async () => {
    const course = {name: "some random name"}
    const response = await supertest(app).post("/courses").send(course);
    expect(response.status).toBe(201);
  });
});