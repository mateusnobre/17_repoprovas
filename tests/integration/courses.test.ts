import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createCourse} from "../factories/courseFactory";
import { createLecturer } from "../factories/lecturerFactory";
import { clearCourses, clearExams } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearExams();
  await clearCourses();
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
    const lecturer = await createLecturer();
    const course = {name: "some random name", lecturerId: lecturer.id}
    const response = await supertest(app).post("/courses").send(course);
    expect(response.status).toBe(201);
  });
});