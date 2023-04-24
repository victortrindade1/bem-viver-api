import Sequelize from "sequelize";

import User from "../app/models/User";
import File from "../app/models/File";
import Aluno from "../app/models/Aluno";
import Ano from "../app/models/Ano";
import Turma from "../app/models/Turma";
import Sistema from "../app/models/Sistema";
import Turno from "../app/models/Turno";
import Materia from "../app/models/Materia";
import Periodo from "../app/models/Periodo";
import Horaentrada from "../app/models/Horaentrada";
import Horasaida from "../app/models/Horasaida";
import Professor from "../app/models/Professor";
import Horario from "../app/models/Horario";
import ProfessorMateria from "../app/models/ProfessorMateria";

import databaseConfig from "../config/database";

const models = [
  User,
  File,
  Aluno,
  Ano,
  Turma,
  Sistema,
  Turno,
  Materia,
  Periodo,
  Horaentrada,
  Horasaida,
  Professor,
  Horario,
  ProfessorMateria,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
