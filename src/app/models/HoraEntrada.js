import Sequelize, { Model } from "sequelize";

class HoraEntrada extends Model {
  static init(sequelize) {
    super.init(
      {
        horaentrada: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Aluno, {
      foreignKey: "horaentrada_id",
      as: "dados_escolares_horaentrada",
    });
  }
}

export default HoraEntrada;
