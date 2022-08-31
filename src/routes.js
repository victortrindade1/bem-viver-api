import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import AlunoController from "./app/controllers/AlunoController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import AnoController from "./app/controllers/AnoController";
import TurmaController from "./app/controllers/TurmaController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

const upload = multer(multerConfig);

routes.get("/", (req, res) => res.json({ message: "hello world!" }));

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

/**
 * User
 */
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.get("/users", UserController.index);
routes.delete("/users/:id", UserController.delete);
routes.get("/users/:id", UserController.show);

/**
 * Aluno
 */
routes.post("/alunos", AlunoController.store);
routes.put("/alunos/:id", AlunoController.update);
routes.get("/alunos", AlunoController.index);
routes.delete("/alunos/:id", AlunoController.delete);
routes.get("/alunos/:id", AlunoController.show);

/**
 * File
 */
routes.post("/files", upload.single("file"), FileController.store);

/**
 * Ano
 */
routes.post("/anos", AnoController.store);
routes.put("/anos/:id", AnoController.update);
routes.get("/anos", AnoController.index);
routes.delete("/anos/:id", AnoController.delete);
routes.get("/anos/:id", AnoController.show);

/**
 * Turma
 */
routes.post("/turmas", TurmaController.store);
routes.put("/turmas/:id", TurmaController.update);
routes.get("/turmas", TurmaController.index);
routes.delete("/turmas/:id", TurmaController.delete);
routes.get("/turmas/:id", TurmaController.show);

export default routes;
