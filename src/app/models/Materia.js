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
      as: "professores",
      through: "professores_materias",
    });
    this.belongsToMany(models.Turma, {
      foreignKey: "materia_id",
      as: "turmas",
      through: "turmas_materias",
    });
    this.hasMany(models.Horario, {
      foreignKey: "materia_id",
      as: "materia_horario",
    });
  }
}

export default Materia;
