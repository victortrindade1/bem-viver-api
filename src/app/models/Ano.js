import Sequelize, { Model } from "sequelize";

class Ano extends Model {
  static init(sequelize) {
    super.init(
      {
        ano: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Turma, {
      foreignKey: "ano_id",
      as: "dados_escolares_ano",
    });
  }
}

export default Ano;
