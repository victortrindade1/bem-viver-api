import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Hora Saída", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new horasaida", async () => {
    const response = await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/horasaidas")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Hora Saída já existe.", async () => {
    await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update horasaida", async () => {
    const newHoraSaida = await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/horasaidas/${newHoraSaida.body.id}`)
      .send({
        horasaida: "18:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    const newHoraSaida = await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/horasaidas/${newHoraSaida.body.id}`)
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list horasaidas", async () => {
    await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "18:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/horasaidas")
      .query({
        q: "18",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          horasaida: "18:00h",
        }),
      ])
    );
  });

  it("[DELETE] should delete horasaida", async () => {
    const newHoraSaida = await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "18:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/horasaidas/${newHoraSaida.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Horasaida excluído com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Hora Saída não existe", async () => {
    const response = await request(app)
      .del(`/horasaidas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show horasaida", async () => {
    const newHoraSaida = await request(app)
      .post("/horasaidas")
      .send({
        horasaida: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/horasaidas/${newHoraSaida.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Hora Saída não existe", async () => {
    const response = await request(app)
      .get(`/horasaidas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
