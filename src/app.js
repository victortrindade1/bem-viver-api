import express from "express";
import path from "path";

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

    this.server.use(
      "/files",
      // Diretório de imagens
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

// Exportar apenas o server da classe traz segurança
export default new App().server;
