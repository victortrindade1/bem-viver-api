import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Turno", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new turno", async () => {
    const response = await request(app)
      .post("/turnos")
      .send({
        turno: "Noturno",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/turnos")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.status).toBe(400);
  });

  it("[UPDATE] should update turno", async () => {
    const newTurno = await request(app)
      .post("/turnos")
      .send({
        turno: "Diurno",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/turnos/${newTurno.body.id}`)
      .send({
        turno: "Manhã",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    // const newTurno = await request(app)
    //   .post("/turnos")
    //   .send({
    //     turno: "Diurno",
    //   })
    //   .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/turnos/a`)
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.status).toBe(400);
  });

  it("[INDEX] should list turnos", async () => {
    await request(app)
      .post("/turnos")
      .send({
        turno: "Tarde",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/turnos")
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          turno: "Tarde",
        }),
      ])
    );
  });

  it("[DELETE] should delete turno", async () => {
    const newTurno = await request(app)
      .post("/turnos")
      .send({
        turno: "Integral",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/turnos/${newTurno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Turno excluído com sucesso.",
      })
    );
  });

  it("[SHOW] should show turno", async () => {
    const newTurno = await request(app)
      .post("/turnos")
      .send({
        turno: "Fins de Semana",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/turnos/${newTurno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });
});
