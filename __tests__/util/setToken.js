import request from "supertest";
import app from "../../src/app";

const setToken = async () => {
  const response = await request(app).post("/sessions").send({
    email: process.env.EMAIL_ADMIN,
    password: process.env.PASSWORD_ADMIN,
  });
  return response.body.token;
};

export default setToken;
