import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Sistema", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new sistema", async () => {
    const response = await request(app)
      .post("/sistemas")
      .send({
        sistema: "Creche",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/turmas")
      .send({
        ano_id: "texto",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Turma já existe", async () => {
    await request(app)
      .post("/turmas")
      .send({
        turma: "504",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/turmas")
      .send({
        turma: "504",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
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

  it("[UPDATE] should fail validation", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "504",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/turmas/${newTurma.body.id}`)
      .send({
        turma: "505",
        ano_id: "texto",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
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
      .query({
        q: "504",
      })
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

  it("[DELETE] should show error: Turma não existe", async () => {
    const response = await request(app)
      .del(`/turmas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
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

  it("[SHOW] should show error: Turma não existe", async () => {
    const response = await request(app)
      .get(`/turmas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
