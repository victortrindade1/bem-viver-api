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
      .post("/sistemas")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Sistema já existe.", async () => {
    await request(app)
      .post("/sistemas")
      .send({
        sistema: "Fundamental",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/sistemas")
      .send({
        sistema: "Fundamental",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update sistema", async () => {
    const newSistema = await request(app)
      .post("/sistemas")
      .send({
        sistema: "Fundamental",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/sistemas/${newSistema.body.id}`)
      .send({
        sistema: "Maternal",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    const newSistema = await request(app)
      .post("/sistemas")
      .send({
        sistema: "Fundamental",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/sistemas/${newSistema.body.id}`)
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list sistemas", async () => {
    await request(app)
      .post("/sistemas")
      .send({
        sistema: "Maternal",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/sistemas")
      .query({
        q: "Mater",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sistema: "Maternal",
        }),
      ])
    );
  });

  it("[DELETE] should delete sistema", async () => {
    const newSistema = await request(app)
      .post("/sistemas")
      .send({
        sistema: "Maternal",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/sistemas/${newSistema.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Sistema excluído com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Sistema não existe", async () => {
    const response = await request(app)
      .del(`/sistemas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show sistema", async () => {
    const newSistema = await request(app)
      .post("/sistemas")
      .send({
        sistema: "Fundamental",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/sistemas/${newSistema.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Sistema não existe", async () => {
    const response = await request(app)
      .get(`/sistemas/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
