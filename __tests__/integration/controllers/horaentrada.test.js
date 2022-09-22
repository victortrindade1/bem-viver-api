import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Hora Entrada", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new horaentrada", async () => {
    const response = await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/horaentradas")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Hora Entrada já existe.", async () => {
    await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update horaentrada", async () => {
    const newHoraEntrada = await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/horaentradas/${newHoraEntrada.body.id}`)
      .send({
        horaentrada: "18:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    const newHoraEntrada = await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/horaentradas/${newHoraEntrada.body.id}`)
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list horaentradas", async () => {
    await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "18:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/horaentradas")
      .query({
        q: "18",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          horaentrada: "18:00h",
        }),
      ])
    );
  });

  it("[DELETE] should delete horaentrada", async () => {
    const newHoraEntrada = await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "18:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/horaentradas/${newHoraEntrada.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Horaentrada excluído com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Hora Entrada não existe", async () => {
    const response = await request(app)
      .del(`/horaentradas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show horaentrada", async () => {
    const newHoraEntrada = await request(app)
      .post("/horaentradas")
      .send({
        horaentrada: "12:00h",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/horaentradas/${newHoraEntrada.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Hora Entrada não existe", async () => {
    const response = await request(app)
      .get(`/horaentradas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
