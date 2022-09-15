import request from "supertest";
import app from "../../src/app";

const setToken = async () => {
  // Cria user admin
  await request(app).post(process.env.ROUTE_TEST_JWT).send({
    email: process.env.EMAIL_ADMIN,
    password: process.env.PASSWORD_ADMIN,
    name: "Teste",
    isAdmin: true,
  });

  const response = await request(app).post("/sessions").send({
    email: process.env.EMAIL_ADMIN,
    password: process.env.PASSWORD_ADMIN,
  });

  return response.body.token;
};

export default setToken;
