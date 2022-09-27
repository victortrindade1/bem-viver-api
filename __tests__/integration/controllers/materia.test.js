import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Matéria", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new materia", async () => {
    const response = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/materias")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Matéria já existe.", async () => {
    await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update materia", async () => {
    const newMateria = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/materias/${newMateria.body.id}`)
      .send({
        materia: "Português",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    const newMateria = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/materias/${newMateria.body.id}`)
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list materias", async () => {
    await request(app)
      .post("/materias")
      .send({
        materia: "Português",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/materias")
      .query({
        q: "Port",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          materia: "Português",
        }),
      ])
    );
  });

  it("[DELETE] should delete materia", async () => {
    const newMateria = await request(app)
      .post("/materias")
      .send({
        materia: "Português",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/materias/${newMateria.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Matéria excluída com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Matéria não existe.", async () => {
    const response = await request(app)
      .del(`/materias/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show materia", async () => {
    const newMateria = await request(app)
      .post("/materias")
      .send({
        materia: "Matemática",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/materias/${newMateria.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Matéria não existe.", async () => {
    const response = await request(app)
      .get(`/materias/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
