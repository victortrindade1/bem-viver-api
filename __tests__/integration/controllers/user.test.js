import request from "supertest";
import app from "../../../src/app";

import setToken from "../../util/setToken";

describe("User", () => {
  it("should be able to register", async () => {
    const token = await setToken();

    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetoilas.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to register with duplicated email", async () => {
    await request(app).post("/users").send({
      name: "User Teste",
      email: "user@userduplicado.com",
      password: "123456",
      isAdmin: false,
    });

    const response = await request(app).post("/users").send({
      name: "Outro nome",
      email: "user@userduplicado.com",
      password: "123456",
      isAdmin: false,
    });
    expect(response.status).toBe(401);
  });
});
