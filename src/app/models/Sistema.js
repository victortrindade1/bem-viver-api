import Sequelize, { Model } from "sequelize";

class Sistema extends Model {
  static init(sequelize) {
    super.init(
      {
        sistema: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Ano, {
      foreignKey: "sistema_id",
      as: "dados_sistema",
    });
  }
}

export default Sistema;
