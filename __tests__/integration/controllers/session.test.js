import request from "supertest";
import app from "../../../src/app";
import truncate from "../../util/truncate";

describe("Session", () => {
  jest.setTimeout(30000);

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
  });

  it("should invalidate session", async () => {
    const response = await request(app).post("/sessions").send({
      email: "emailsemformatocerto",
      password: "123456",
    });

    return expect(response.status).toBe(400);
  });

  it("should not find user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "register@notfound.com",
      password: "123456",
    });

    expect(response.status).toBe(500);
  });

  it("should not match password", async () => {
    // Cria antes o user
    await request(app).post(process.env.ROUTE_TEST_JWT).send({
      email: process.env.EMAIL_ADMIN,
      password: process.env.PASSWORD_ADMIN,
      name: "Teste",
      isAdmin: true,
    });

    const response = await request(app).post("/sessions").send({
      email: process.env.EMAIL_ADMIN,
      password: "passworderrado",
    });

    expect(response.status).toBe(500);
  });
});
