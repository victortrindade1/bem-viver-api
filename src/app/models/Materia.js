import Sequelize, { Model } from "sequelize";

class Materia extends Model {
  static init(sequelize) {
    super.init(
      {
        materia: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Materia",
        tableName: "materias",
      }
    );

    return this;
  }

  // static associate(models) {
  // this.hasMany(models.Aluno, {
  //   foreignKey: "horaentrada_id",
  //   as: "dados_escolares_horaentrada",
  // });
  // }
}

export default Materia;
