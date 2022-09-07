import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import AlunoController from "./app/controllers/AlunoController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import SistemaController from "./app/controllers/SistemaController";
import AnoController from "./app/controllers/AnoController";
import TurmaController from "./app/controllers/TurmaController";
import TurnoController from "./app/controllers/TurnoController";
import PeriodoController from "./app/controllers/PeriodoController";
import HoraEntradaController from "./app/controllers/HoraEntradaController";
import HoraSaidaController from "./app/controllers/HoraSaidaController";

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
 * Sistema
 */
routes.post("/sistemas", SistemaController.store);
routes.put("/sistemas/:id", SistemaController.update);
routes.get("/sistemas", SistemaController.index);
routes.delete("/sistemas/:id", SistemaController.delete);
routes.get("/sistemas/:id", SistemaController.show);

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

/**
 * Turno
 */
routes.post("/turnos", TurnoController.store);
routes.put("/turnos/:id", TurnoController.update);
routes.get("/turnos", TurnoController.index);
routes.delete("/turnos/:id", TurnoController.delete);
routes.get("/turnos/:id", TurnoController.show);

/**
 * Periodo
 */
routes.post("/periodos", PeriodoController.store);
routes.put("/periodos/:id", PeriodoController.update);
routes.get("/periodos", PeriodoController.index);
routes.delete("/periodos/:id", PeriodoController.delete);
routes.get("/periodos/:id", PeriodoController.show);

/**
 * HoraEntrada
 */
routes.post("/horaentradas", HoraEntradaController.store);
routes.put("/horaentradas/:id", HoraEntradaController.update);
routes.get("/horaentradas", HoraEntradaController.index);
routes.delete("/horaentradas/:id", HoraEntradaController.delete);
routes.get("/horaentradas/:id", HoraEntradaController.show);

/**
 * HoraSaida
 */
routes.post("/horasaidas", HoraSaidaController.store);
routes.put("/horasaidas/:id", HoraSaidaController.update);
routes.get("/horasaidas", HoraSaidaController.index);
routes.delete("/horasaidas/:id", HoraSaidaController.delete);
routes.get("/horasaidas/:id", HoraSaidaController.show);

export default routes;
