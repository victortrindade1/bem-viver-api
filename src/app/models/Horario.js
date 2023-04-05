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
        modelName: "Horario",
        tableName: "horarios",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Professor, {
      as: "professor_horario",
      foreignKey: "professor_id",
    });
    this.belongsTo(models.Materia, {
      as: "materia_horario",
      foreignKey: "materia_id",
    });
    this.belongsTo(models.Turma, {
      as: "turmas",
      foreignKey: "turma_id",
    });
  }
}

export default Horario;
