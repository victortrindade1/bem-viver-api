import Sequelize, { Model } from "sequelize";

class Horaentrada extends Model {
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

export default Horaentrada;
