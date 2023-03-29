import Sequelize, { Model } from "sequelize";

class Horario extends Model {
  static init(sequelize) {
    super.init(
      {
        diahora: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Professor, {
      foreignKey: "professor_id",
      as: "professor",
    });
    this.belongsTo(models.Materia, {
      foreignKey: "materia_id",
      as: "materia_horario",
    });
    this.belongsTo(models.Turma, {
      foreignKey: "turma_id",
      as: "turma_horario",
    });
  }
}

export default Horario;
