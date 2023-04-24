import { Model } from "sequelize";

class ProfessorMateria extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        modelName: "ProfessorMateria",
        tableName: "professores_materias",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Professor, {
      as: "professor_materia",
      foreignKey: "professor_id",
    });
    this.belongsTo(models.Materia, {
      as: "materia_professor",
      foreignKey: "materia_id",
    });
  }
}

export default ProfessorMateria;
