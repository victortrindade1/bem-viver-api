import "./bootstrap";

import express from "express";
import * as Sentry from "@sentry/node";
import "express-async-errors";
import Youch from "youch";
import path from "path";
import cors from "cors";

import sentryConfig from "./config/sentry";

import routes from "./routes";
import "./database";

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    // this.server.use(cors({ origin: "https://foobar.com.br" }));
    this.server.use(cors());
    this.server.use(express.json());

    this.server.use(
      "/files",
      // Diretório de imagens
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: "Internal server error" });
    });
  }
}

// Exportar apenas o server da classe traz segurança
export default new App().server;
