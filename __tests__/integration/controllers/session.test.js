import request from "supertest";
import app from "../../../src/app";
import truncate from "../../util/truncate";

describe("Session", () => {
  jest.setTimeout(30000);

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
  });

  it("[STORE] should invalidate session", async () => {
    const response = await request(app).post("/sessions").send({
      email: "emailsemformatocerto",
      password: "123456",
    });

    expect(response.status).toBe(400);
  });

  it("[STORE] should not find user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "register@notfound.com",
      password: "123456",
    });

    expect(response.body).toBe("User not found");
    expect(response.status).toBe(400);
  });

  it("[STORE] should not match password", async () => {
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

    expect(response.body).toBe("Password does not match");
    expect(response.status).toBe(400);
  });

  it("[STORE] should store new session", async () => {
    await request(app).post(process.env.ROUTE_TEST_JWT).send({
      email: process.env.EMAIL_ADMIN,
      password: process.env.PASSWORD_ADMIN,
      name: "Teste",
      isAdmin: true,
    });

    const response = await request(app).post("/sessions").send({
      email: process.env.EMAIL_ADMIN,
      password: process.env.PASSWORD_ADMIN,
    });

    expect(response.body).toHaveProperty("token");
  });
});
