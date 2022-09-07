import Sequelize, { Model } from "sequelize";

class Periodo extends Model {
  static init(sequelize) {
    super.init(
      {
        periodo: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Aluno, {
      foreignKey: "periodo_id",
      as: "dados_escolares_periodo",
    });
  }
}

export default Periodo;
