import Sequelize, { Model } from "sequelize";

class Materia extends Model {
  static init(sequelize) {
    super.init(
      {
        materia: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Materia",
        tableName: "materias",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Professor, {
      foreignKey: "materia_id",
      as: "professores_horario",
      through: "horarios",
    });
    this.belongsToMany(models.Professor, {
      foreignKey: "materia_id",
      as: "materias_professor",
      through: "professores_materias",
    });
    this.belongsToMany(models.Turma, {
      foreignKey: "materia_id",
      as: "turmas_horario",
      through: "horarios",
    });
    this.hasMany(models.Horario, {
      foreignKey: "materia_id",
      as: "materia_horario",
    });
    this.hasMany(models.ProfessorMateria, {
      as: "materia_professor",
      foreignKey: "materia_id",
    });
  }
}

export default Materia;
