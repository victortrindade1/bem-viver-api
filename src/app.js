import express from "express";
import routes from "./routes";
import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// Exportar apenas o server da classe traz segurança
export default new App().server;
