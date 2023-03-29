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
      foreignKey: "turma_id",
      as: "professores",
      through: "professores_turmas",
    });
    this.belongsToMany(models.Materia, {
      foreignKey: "turma_id",
      as: "materias",
      through: "turmas_materias",
    });
    this.hasMany(models.Aluno, {
      foreignKey: "turma_id",
      as: "dados_turma",
    });
    this.hasMany(models.Horario, {
      foreignKey: "turma_id",
      as: "turma_horario",
    });
  }
}

export default Turma;
