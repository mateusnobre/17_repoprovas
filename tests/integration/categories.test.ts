import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createCategory } from "../factories/categoryFactory";
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
