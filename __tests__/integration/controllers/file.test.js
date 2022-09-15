import request from "supertest";
import { resolve } from "path";

import app from "../../../src/app";
import truncate from "../../util/truncate";

import setToken from "../../util/setToken";

describe("File", () => {
  let token = "";

  beforeAll(async () => {
    token = await setToken();
  });

  beforeEach(() => {
    truncate(); // Apaga dados a cada teste para não conflitar
  });

  it("should upload a new file", async () => {
    // const token = await setToken();

    const response = await request(app)
      .post("/files")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "file",
        resolve(__dirname, "..", "..", "tmp", "uploads", "avatar2.jpeg")
      )
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("id");
  });
});
