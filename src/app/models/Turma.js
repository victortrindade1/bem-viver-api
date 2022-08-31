import Sequelize, { Model } from "sequelize";

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        label: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ano, { foreignKey: "ano_id", as: "ano" });
  }
}

export default Turma;
