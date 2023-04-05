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
      as: "dados_ano",
    });
    this.belongsTo(models.Turno, {
      foreignKey: "turno_id",
      as: "dados_turno",
    });
    this.belongsToMany(models.Professor, {
      as: "professores_horario",
      foreignKey: "turma_id",
      through: "horarios",
    });
    this.belongsToMany(models.Materia, {
      as: "materias_horario",
      foreignKey: "turma_id",
      through: "horarios",
    });
    this.hasMany(models.Aluno, {
      foreignKey: "turma_id",
      as: "dados_turma",
    });
    this.hasMany(models.Horario, {
      foreignKey: "turma_id",
      as: "turmas",
    });
  }
}

export default Turma;
