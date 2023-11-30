const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

describe("/ endpoint working", () => {
  it("should return a response", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("/add endpoint working", () => {
  it("should return a response", async () => {
    const response = await request.get("/add");
    expect(response.status).toBe(200);
  });
});

