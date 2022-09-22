import request from "supertest";

import app from "../../../src/app";
import truncate from "../../util/truncate";
import setToken from "../../util/setToken";

describe("Ano", () => {
  let token = "";

  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });

  it("[STORE] should store new ano", async () => {
    const response = await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[STORE] should fail validation", async () => {
    const response = await request(app)
      .post("/anos")
      .send({
        foo: "bar",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[STORE] should show error: Ano já existe.", async () => {
    await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[UPDATE] should update ano", async () => {
    const newAno = await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/anos/${newAno.body.id}`)
      .send({
        ano: "2",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[UPDATE] should fail validation", async () => {
    // await request(app)
    //   .post("/anos")
    //   .send({
    //     ano: "1",
    //   })
    //   .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/anos/a`)
      .send({
        ano: 1,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[INDEX] should list anos", async () => {
    await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/anos")
      .query({
        q: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ano: "1",
        }),
      ])
    );
  });

  it("[DELETE] should delete ano", async () => {
    const newAno = await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .del(`/anos/${newAno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toEqual(
      expect.objectContaining({
        message: "Ano excluído com sucesso.",
      })
    );
  });

  it("[DELETE] should show error: Ano não existe", async () => {
    const response = await request(app)
      .del(`/anos/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it("[SHOW] should show ano", async () => {
    const newAno = await request(app)
      .post("/anos")
      .send({
        ano: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/anos/${newAno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });

  it("[SHOW] should show error: Ano não existe", async () => {
    const response = await request(app)
      .get(`/anos/99`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
