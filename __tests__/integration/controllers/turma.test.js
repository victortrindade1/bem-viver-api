import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Turma", () => {
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

  it("[STORE] should store new turma", async () => {
    const response = await request(app)
      .post("/turmas")
      .send({
        turma: "5070",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should update turma", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "501",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/turmas/${newTurma.body.id}`)
      .send({
        turma: "503 - A",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[INDEX] should list turmas", async () => {
    await request(app)
      .post("/turmas")
      .send({
        turma: "504",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/turmas")
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          turma: "504",
        }),
      ])
    );
  });

  it("[DELETE] should delete turma", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "505",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/turmas/${newTurma.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Turma excluída com sucesso.",
      })
    );
  });

  it("[SHOW] should show turma", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "508",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/turmas/${newTurma.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });
});
