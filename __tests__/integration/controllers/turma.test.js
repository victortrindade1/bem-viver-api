import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Turma", () => {
  jest.setTimeout(30000);

  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new turma", async () => {
    const newProfessor = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Claudia Marcia",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    const newMateria = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/turmas")
      .send({
        turma: "5070",
        professores: [newProfessor.body.id],
        materias: [newMateria.body.id],
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
    expect(response.body.error).toBe("Turma já existe.");
  });

  it("[UPDATE] should update turma", async () => {
    const newProfessor = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Claudia Marcia",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    const newMateria = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

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
        professores: [newProfessor.body.id],
        materias: [newMateria.body.id],
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

  it("[INDEX] should filter turmas by Turno", async () => {
    const newTurno = await request(app)
      .post("/turnos")
      .send({
        turno: "Noturno",
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/turmas")
      .send({
        turma: "507",
        turno_id: newTurno.body.id,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/turmas")
      .query({
        q: "Notur",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          turma: "507",
        }),
      ])
    );
  });

  it("[INDEX] should filter turmas by Ano", async () => {
    const newAno = await request(app)
      .post("/anos")
      .send({
        ano: "Primeiro",
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/turmas")
      .send({
        turma: "507",
        ano_id: newAno.body.id,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/turmas")
      .query({
        q: "Primei",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          turma: "507",
        }),
      ])
    );
  });

  it("[INDEX] should filter turmas by Professor", async () => {
    const newProfessor = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Claudia Marcia",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/turmas")
      .send({
        turma: "507",
        professores: [newProfessor.body.id],
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/turmas")
      .query({
        q: "Claudia",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          turma: "507",
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
