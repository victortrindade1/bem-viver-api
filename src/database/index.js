import Sequelize from "sequelize";

import User from "../app/models/User";
import File from "../app/models/File";
import Aluno from "../app/models/Aluno";
import Ano from "../app/models/Ano";
import Turma from "../app/models/Turma";
import Sistema from "../app/models/Sistema";
import Turno from "../app/models/Turno";
import Statuspagamento from "../app/models/Statuspagamento";
import Periodo from "../app/models/Periodo";
import HoraEntrada from "../app/models/HoraEntrada";
import HoraSaida from "../app/models/HoraSaida";

import databaseConfig from "../config/database";

const models = [
  User,
  File,
  Aluno,
  Ano,
  Turma,
  Sistema,
  Turno,
  Statuspagamento,
  Periodo,
  HoraEntrada,
  HoraSaida,
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
