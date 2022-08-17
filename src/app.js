import express from "express";
import routes from "./routes";
// import './database'; (só depois com sequelize)

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

// Exporto apenas o server da classe, e não a classe toda, pois traz segurança
export default new App().server;
