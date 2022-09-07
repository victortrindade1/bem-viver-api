import Sequelize, { Model } from "sequelize";

class Statuspagamento extends Model {
  static init(sequelize) {
    super.init(
      {
        statuspagamento: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Aluno, {
      foreignKey: "statuspagamento_id",
      as: "dados_escolares_statuspagamento",
    });
  }
}

export default Statuspagamento;
