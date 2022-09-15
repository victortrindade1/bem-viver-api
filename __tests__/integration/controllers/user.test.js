import request from "supertest";

import app from "../../../src/app";

import User from "../../../src/app/models/User";

import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("User", () => {
  let token = "";

  beforeEach(() => {
    truncate(); // Apaga dados a cada teste para não conflitar
  });

  beforeAll(async () => {
    token = await setToken();
  });

  it("[STORE] should throw error in database", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "user@tetoila.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "user@tetoila.com",
        password: "12345",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should be able to register", async () => {
    // Primeiro deleta esse usuário se já tiver sido criado
    const userExists = await User.findOne({
      where: { email: "teta@tetoila.com" },
    });

    if (userExists) {
      await User.destroy({ where: { email: "teta@tetoila.com" } });
    }

    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetoila.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should not be able to register with duplicated email", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "User Teste",
        email: "user@userduplicado.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/users")
      .send({
        name: "Outro nome",
        email: "user@userduplicado.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should not permit register with invalid token", async () => {
    // Primeiro deleta esse usuário se já tiver sido criado
    const userExists = await User.findOne({
      where: { email: "teta@tetoila.com" },
    });

    if (userExists) {
      await User.destroy({ where: { email: "teta@tetoila.com" } });
    }

    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetoila.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer 1234`);

    expect(response.status).toBe(401);
  });

  it("[STORE] should not permit without token", async () => {
    // Primeiro deleta esse usuário se já tiver sido criado
    const userExists = await User.findOne({
      where: { email: "teta@tetoila.com" },
    });

    if (userExists) {
      await User.destroy({ where: { email: "teta@tetoila.com" } });
    }

    const response = await request(app).post("/users").send({
      name: "Teta dos Corações",
      email: "teta@tetoila.com",
      password: "123456",
      isAdmin: false,
    });

    expect(response.status).toBe(401);
  });
});
