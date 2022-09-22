import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Periodo", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new periodo", async () => {
    const response = await request(app)
      .post("/periodos")
      .send({
        periodo: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/periodos")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Periodo já existe.", async () => {
    await request(app)
      .post("/periodos")
      .send({
        periodo: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/periodos")
      .send({
        periodo: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update periodo", async () => {
    const newPeriodo = await request(app)
      .post("/periodos")
      .send({
        periodo: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/periodos/${newPeriodo.body.id}`)
      .send({
        periodo: "Integral",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    const newPeriodo = await request(app)
      .post("/periodos")
      .send({
        periodo: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/periodos/${newPeriodo.body.id}`)
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list periodos", async () => {
    await request(app)
      .post("/periodos")
      .send({
        periodo: "Integral",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/periodos")
      .query({
        q: "Integ",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          periodo: "Integral",
        }),
      ])
    );
  });

  it("[DELETE] should delete periodo", async () => {
    const newPeriodo = await request(app)
      .post("/periodos")
      .send({
        periodo: "Integral",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/periodos/${newPeriodo.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Periodo excluído com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Periodo não existe", async () => {
    const response = await request(app)
      .del(`/periodos/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show periodo", async () => {
    const newPeriodo = await request(app)
      .post("/periodos")
      .send({
        periodo: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/periodos/${newPeriodo.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Periodo não existe", async () => {
    const response = await request(app)
      .get(`/periodos/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
