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
import HoraentradaController from "./app/controllers/HoraentradaController";
import HorasaidaController from "./app/controllers/HorasaidaController";
import MateriaController from "./app/controllers/MateriaController";
import ProfessorController from "./app/controllers/ProfessorController";
import MatriculaController from "./app/controllers/MatriculaController";

import {
  validateUserStore,
  validateUserUpdate,
} from "./app/validators/UserValidator";
import {
  validateTurnoStore,
  validateTurnoUpdate,
} from "./app/validators/TurnoValidator";
import {
  validateTurmaStore,
  validateTurmaUpdate,
} from "./app/validators/TurmaValidator";
import {
  validateSistemaStore,
  validateSistemaUpdate,
} from "./app/validators/SistemaValidator";
import validateSessionStore from "./app/validators/SessionValidator";
import {
  validatePeriodoStore,
  validatePeriodoUpdate,
} from "./app/validators/PeriodoValidator";
import {
  validateHorasaidaStore,
  validateHorasaidaUpdate,
} from "./app/validators/HorasaidaValidator";
import {
  validateHoraentradaStore,
  validateHoraentradaUpdate,
} from "./app/validators/HoraentradaValidator";
import {
  validateAnoStore,
  validateAnoUpdate,
} from "./app/validators/AnoValidator";
import {
  validateAlunoStore,
  validateAlunoUpdate,
} from "./app/validators/AlunoValidator";
import {
  validateMateriaStore,
  validateMateriaUpdate,
} from "./app/validators/MateriaValidator";
import {
  validateProfessorStore,
  validateProfessorUpdate,
} from "./app/validators/ProfessorValidator";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

const upload = multer(multerConfig);

routes.get("/", (req, res) => res.json({ message: "hello world!" }));

routes.post("/sessions", validateSessionStore, SessionController.store);

if (process.env.NODE_ENV === "test") {
  routes.post(process.env.ROUTE_TEST_JWT, UserController.store);
}

routes.use(authMiddleware);

/**
 * User
 */
routes.post("/users", validateUserStore, UserController.store);
routes.put("/users/:id", validateUserUpdate, UserController.update);
routes.get("/users", UserController.index);
routes.delete("/users/:id", UserController.delete);
routes.get("/users/:id", UserController.show);

/**
 * Aluno
 */
routes.post("/alunos", validateAlunoStore, AlunoController.store);
routes.put("/alunos/:id", validateAlunoUpdate, AlunoController.update);
routes.get("/alunos", AlunoController.index);
routes.delete("/alunos/:id", AlunoController.delete);
routes.get("/alunos/:id", AlunoController.show);

/**
 * Matrícula - retorna último id de aluno + 1 pra gerar nova matrícula
 */
routes.post("/alunos/novo/matricula", MatriculaController.show);

/**
 * File
 */
routes.post("/files", upload.single("file"), FileController.store);
routes.delete("/files/:id", FileController.delete);

/**
 * Sistema
 */
routes.post("/sistemas", validateSistemaStore, SistemaController.store);
routes.put("/sistemas/:id", validateSistemaUpdate, SistemaController.update);
routes.get("/sistemas", SistemaController.index);
routes.delete("/sistemas/:id", SistemaController.delete);
routes.get("/sistemas/:id", SistemaController.show);

/**
 * Ano
 */
routes.post("/anos", validateAnoStore, AnoController.store);
routes.put("/anos/:id", validateAnoUpdate, AnoController.update);
routes.get("/anos", AnoController.index);
routes.delete("/anos/:id", AnoController.delete);
routes.get("/anos/:id", AnoController.show);

/**
 * Turma
 */
routes.post("/turmas", validateTurmaStore, TurmaController.store);
routes.put("/turmas/:id", validateTurmaUpdate, TurmaController.update);
routes.get("/turmas", TurmaController.index);
routes.delete("/turmas/:id", TurmaController.delete);
routes.get("/turmas/:id", TurmaController.show);

/**
 * Turno
 */
routes.post("/turnos", validateTurnoStore, TurnoController.store);
routes.put("/turnos/:id", validateTurnoUpdate, TurnoController.update);
routes.get("/turnos", TurnoController.index);
routes.delete("/turnos/:id", TurnoController.delete);
routes.get("/turnos/:id", TurnoController.show);

/**
 * Periodo
 */
routes.post("/periodos", validatePeriodoStore, PeriodoController.store);
routes.put("/periodos/:id", validatePeriodoUpdate, PeriodoController.update);
routes.get("/periodos", PeriodoController.index);
routes.delete("/periodos/:id", PeriodoController.delete);
routes.get("/periodos/:id", PeriodoController.show);

/**
 * Horaentrada
 */
routes.post(
  "/horaentradas",
  validateHoraentradaStore,
  HoraentradaController.store
);
routes.put(
  "/horaentradas/:id",
  validateHoraentradaUpdate,
  HoraentradaController.update
);
routes.get("/horaentradas", HoraentradaController.index);
routes.delete("/horaentradas/:id", HoraentradaController.delete);
routes.get("/horaentradas/:id", HoraentradaController.show);

/**
 * Horasaida
 */
routes.post("/horasaidas", validateHorasaidaStore, HorasaidaController.store);
routes.put(
  "/horasaidas/:id",
  validateHorasaidaUpdate,
  HorasaidaController.update
);
routes.get("/horasaidas", HorasaidaController.index);
routes.delete("/horasaidas/:id", HorasaidaController.delete);
routes.get("/horasaidas/:id", HorasaidaController.show);

/**
 * Materia
 */
routes.post("/materias", validateMateriaStore, MateriaController.store);
routes.put("/materias/:id", validateMateriaUpdate, MateriaController.update);
routes.get("/materias", MateriaController.index);
routes.delete("/materias/:id", MateriaController.delete);
routes.get("/materias/:id", MateriaController.show);

/**
 * Materia
 */
routes.post("/professores", validateProfessorStore, ProfessorController.store);
routes.put(
  "/professores/:id",
  validateProfessorUpdate,
  ProfessorController.update
);
routes.get("/professores", ProfessorController.index);
routes.delete("/professores/:id", ProfessorController.delete);
routes.get("/professores/:id", ProfessorController.show);

export default routes;
