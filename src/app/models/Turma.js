import Sequelize, { Model } from "sequelize";

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        turma: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ano, {
      foreignKey: "ano_id",
      as: "dados_escolares_ano",
    });
    this.belongsTo(models.Turno, {
      foreignKey: "turno_id",
      as: "dados_escolares_turno",
    });
    this.hasMany(models.Aluno, {
      foreignKey: "turma_id",
      as: "dados_escolares_turma",
    });
  }
}

export default Turma;
