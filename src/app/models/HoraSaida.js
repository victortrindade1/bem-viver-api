import Sequelize, { Model } from "sequelize";

class HoraSaida extends Model {
  static init(sequelize) {
    super.init(
      {
        horasaida: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Aluno, {
      foreignKey: "horasaida_id",
      as: "dados_escolares_horasaida",
    });
  }
}

export default HoraSaida;
