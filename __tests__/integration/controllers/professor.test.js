import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Professor", () => {
  jest.setTimeout(8000);

  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new professor", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "501",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Claudia Marcia",
        professor_cpf: "12345678912",
        turmas: [newTurma.body.id],
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/professores")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Professor já existe.", async () => {
    await request(app)
      .post("/professores")
      .send({
        professor_nome: "Claudia Marcia",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Outro nome com msm cpf",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update professor", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "501",
      })
      .set("Authorization", `Bearer ${token}`);

    const newProfessor = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Foo Bar",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/professores/${newProfessor.body.id}`)
      .send({
        professor_cpf: "12345678913",
        turmas: [newTurma.body.id],
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    const newProfessor = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Foo Bar",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/professores/${newProfessor.body.id}`)
      .send({
        turmas: "foobar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should show error: Existe outro professor com este CPF.", async () => {
    const newProfessor = await request(app)
      .post("/professores")
      .send({
        professor_nome: "Foo Bar",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/professores")
      .send({
        professor_nome: "Outro professor",
        professor_cpf: "11111111111",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/professores/${newProfessor.body.id}`)
      .send({
        professor_cpf: "11111111111",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list professores", async () => {
    await request(app)
      .post("/professores")
      .send({
        professor_nome: "Fernando",
        professor_cpf: "12345678912",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/professores")
      .query({
        q: "Fern",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          professor_nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list professores by Turma", async () => {
    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "Turma 501",
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/professores")
      .send({
        professor_nome: "Fernando",
        professor_cpf: "12345678912",
        turmas: [newTurma.body.id],
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/professores")
      .query({
        q: "501",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          professor_nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list professores by Ano", async () => {
    const newAno = await request(app)
      .post("/anos")
      .send({
        ano: "Maternal III",
      })
      .set("Authorization", `Bearer ${token}`);

    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "501",
        ano_id: newAno.body.id,
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/professores")
      .send({
        professor_nome: "Fernando",
        professor_cpf: "12345678912",
        turmas: [newTurma.body.id],
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/professores")
      .query({
        q: "Matern",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          professor_nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list professores by Turno", async () => {
    const newTurno = await request(app)
      .post("/turnos")
      .send({
        turno: "Integral",
      })
      .set("Authorization", `Bearer ${token}`);

    const newTurma = await request(app)
      .post("/turmas")
      .send({
        turma: "501",
        turno_id: newTurno.body.id,
      })
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/professores")
      .send({
        professor_nome: "Fernando",
        professor_cpf: "12345678912",
        turmas: [newTurma.body.id],
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/professores")
      .query({
        q: "Integ",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          professor_nome: "Fernando",
        }),
      ])
    );
  });
});
