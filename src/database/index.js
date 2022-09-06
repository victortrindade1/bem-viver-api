import Sequelize from "sequelize";

import User from "../app/models/User";
import File from "../app/models/File";
import Aluno from "../app/models/Aluno";
import Ano from "../app/models/Ano";
import Turma from "../app/models/Turma";
import Sistema from "../app/models/Sistema";

// import AlunosDado from "../app/models/AlunosDado";

import databaseConfig from "../config/database";

const models = [User, File, Aluno, Ano, Turma, Sistema];

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
