import request from "supertest";
import { resolve } from "path";

import app from "../../../src/app";
import truncate from "../../util/truncate";

import setToken from "../../util/setToken";

describe("File", () => {
  // jest.setTimeout(30000);

  let token = "";

  // beforeAll(async () => {
  //   token = await setToken();
  // });
  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
    token = await setToken();
  });
  // beforeEach(async () => {
  //   await truncate().then(async () => {
  //     token = await setToken();
  //   });
  // });

  it("[STORE] should upload a new file", async () => {
    const response = await request(app)
      .post("/files")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "file",
        resolve(__dirname, "..", "..", "tmp", "uploads", "avatar2.jpeg")
      )
      .set("Authorization", `Bearer ${token}`);

    // Deleta depois pra não lotar servidor
    await request(app)
      .del(`/files/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    return expect(response.body).toHaveProperty("id");
  });
});
