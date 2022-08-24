import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import AlunoController from "./app/controllers/AlunoController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import IsAdminController from "./app/controllers/IsAdminController";

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

routes.get("/admins", IsAdminController.index);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
