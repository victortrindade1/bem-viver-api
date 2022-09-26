import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Aluno", () => {
  jest.setTimeout(30000);

  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new aluno", async () => {
    const response = await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Nome já existe.", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_pessoais_data_nascimento: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1235,
        dados_pessoais_data_nascimento: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update aluno", async () => {
    const newAluno = await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/alunos/${newAluno.body.id}`)
      .send({
        ativo: false,
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    // await request(app)
    //   .post("/alunos")
    //   .send({
    //     aluno: "1",
    //   })
    //   .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/alunos/a`)
      .send({
        aluno: 1,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list alunos", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/alunos")
      .query({
        q: "Fern",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list alunos by Matricula", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/alunos")
      .query({
        q: "123",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list alunos by Sistema", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
        sistema: "Fundamental",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/alunos")
      .query({
        q: "Fund",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list alunos by Ano", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
        ano: "1 Tarde",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/alunos")
      .query({
        q: "Tard",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list alunos by Turma", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
        Turma: "503 Tarde",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/alunos")
      .query({
        q: "503",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: "Fernando",
        }),
      ])
    );
  });

  it("[INDEX] should list alunos by Status", async () => {
    await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
        statuspagamento: "Sem Pgto.",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/alunos")
      .query({
        q: "Sem Pgto",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: "Fernando",
        }),
      ])
    );
  });

  it("[DELETE] should delete aluno", async () => {
    const newAluno = await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/alunos/${newAluno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Aluno excluído com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Aluno não existe", async () => {
    const response = await request(app)
      .del(`/alunos/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show aluno", async () => {
    const newAluno = await request(app)
      .post("/alunos")
      .send({
        nome: "Fernando",
        matricula: 1234,
        dados_escolares_data_matricula: "12/02/2023",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/alunos/${newAluno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Aluno não existe", async () => {
    const response = await request(app)
      .get(`/alunos/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
