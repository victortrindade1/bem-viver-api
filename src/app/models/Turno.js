import Sequelize, { Model } from "sequelize";

class Turno extends Model {
  static init(sequelize) {
    super.init(
      {
        turno: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // this.hasMany(models.Aluno, {
    //   foreignKey: "turno_id",
    //   as: "dados_turno",
    // });
    this.hasMany(models.Turma, {
      foreignKey: "turno_id",
      as: "dados_turno",
    });
  }
}

export default Turno;
