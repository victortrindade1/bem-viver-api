import request from "supertest";
// import { spyOn } from "jest";

import app from "../../../src/app";

// import User from "../../../src/app/models/User";

import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("User", () => {
  jest.setTimeout(30000);

  let token = "";

  // beforeAll(async () => {
  //   token = await setToken();
  // });
  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });
  // beforeEach(async () => {
  //   await truncate().then(async () => {
  //     token = await setToken();
  //   });
  // });

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

    return expect(response.status).toBe(400);
  });

  it("[STORE] should be able to register", async () => {
    // expect.assertions(1); // Para cobrir o catch do Controller no teste
    // try {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetoila.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
    // } catch (e) {
    //   // eslint-disable-next-line jest/no-conditional-expect
    //   expect(e).toMatch("error");
    // }
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

    return expect(response.status).toBe(400);
  });

  it("[STORE] should not permit register with invalid token", async () => {
    // Primeiro deleta esse usuário se já tiver sido criado
    // const userExists = await User.findOne({
    //   where: { email: "teta@tetoila.com" },
    // });

    // if (userExists) {
    //   await User.destroy({ where: { email: "teta@tetoila.com" } });
    // }

    const response = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetoila.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer 1234`);

    return expect(response.status).toBe(401);
  });

  it("[STORE] should not permit without token", async () => {
    // Primeiro deleta esse usuário se já tiver sido criado
    // const userExists = await User.findOne({
    //   where: { email: "teta@tetoila.com" },
    // });

    // if (userExists) {
    //   await User.destroy({ where: { email: "teta@tetoila.com" } });
    // }

    const response = await request(app).post("/users").send({
      name: "Teta dos Corações",
      email: "teta@tetoila.com",
      password: "123456",
      isAdmin: false,
    });

    return expect(response.status).toBe(401);
  });

  it("[UPDATE] should update user", async () => {
    // Primeiro cria o usuário
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetinha.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/users/${newUser.body.id}`)
      .send({
        name: "Teta das Edições",
        email: "diferente@email.com",
      })
      .set("Authorization", `Bearer ${token}`);

    // const spy = jest.spyOn(response).mockImplementation(() => {
    //   throw new Error();
    // });

    // expect(spy).toHaveBeenCalled();

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should require password and confirm password if request has oldPassword", async () => {
    // Primeiro cria o usuário
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetudo.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/users/${newUser.body.id}`)
      .send({
        oldPassword: "123456",
        password: "123457",
        confirmPassword: "123457",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    // Primeiro cria o usuário
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@teta.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/users/${newUser.body.id}`)
      .send({
        oldPassword: "foobar",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.status).toBe(400);
  });

  it("[UPDATE] should not match password", async () => {
    // Primeiro cria o usuário
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetenha.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/users/${newUser.body.id}`)
      .send({
        oldPassword: "foobar",
        password: "abcdef",
        confirmPassword: "abcdef",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.status).toBe(401);
  });

  it("[UPDATE] should not update e-mail to another existing e-mail", async () => {
    // Usuário 1
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@teteia.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    // Usuário 2
    const newUser2 = await request(app)
      .post("/users")
      .send({
        name: "Outro Cadastro",
        email: "teta@outroemail.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/users/${newUser.body.id}`)
      .send({
        email: newUser2.body.email,
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.status).toBe(400);
  });

  it("[INDEX] should list users", async () => {
    // expect.assertions(1);

    // Usuário 1
    await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tetete.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/users`)
      .query({
        q: "Teta dos",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Teta dos Corações",
        }),
      ])
    );
  });

  it("[DELETE] should delete user", async () => {
    // Usuário 1
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@tututu.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/users/${newUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "User deleted successfully.",
      })
    );
  });

  it("[SHOW] should show user", async () => {
    expect.assertions(1);

    // Usuário 1
    const newUser = await request(app)
      .post("/users")
      .send({
        name: "Teta dos Corações",
        email: "teta@titica.com",
        password: "123456",
        isAdmin: false,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/users/${newUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should not show user", async () => {
    const response = await request(app)
      .get(`/users/99`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.status).toBe(400);
  });
});
