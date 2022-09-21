import Sequelize from "sequelize";

import User from "../app/models/User";
import File from "../app/models/File";
import Aluno from "../app/models/Aluno";
import Ano from "../app/models/Ano";
import Turma from "../app/models/Turma";
import Sistema from "../app/models/Sistema";
import Turno from "../app/models/Turno";
// import Statuspagamento from "../app/models/Statuspagamento";
import Periodo from "../app/models/Periodo";
import Horaentrada from "../app/models/Horaentrada";
import Horasaida from "../app/models/Horasaida";

import databaseConfig from "../config/database";

const models = [
  User,
  File,
  Aluno,
  Ano,
  Turma,
  Sistema,
  Turno,
  // Statuspagamento,
  Periodo,
  Horaentrada,
  Horasaida,
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
