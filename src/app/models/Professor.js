import Sequelize, { Model } from "sequelize";

class Professor extends Model {
  static init(sequelize) {
    super.init(
      {
        professor_nome: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
        professor_celular: Sequelize.STRING,
        professor_telefone: Sequelize.STRING,
        professor_email: Sequelize.STRING,
        professor_cpf: Sequelize.STRING,
        professor_rg: Sequelize.STRING,
        professor_data_nascimento: Sequelize.STRING,
        profissional_data_matricula: Sequelize.STRING,
        profissional_data_encerramento: Sequelize.STRING,
        profissional_registro_cfep: Sequelize.STRING,
        profissional_formacao_acad_1: Sequelize.STRING,
        profissional_instituicao_1: Sequelize.STRING,
        profissional_grau_formacao_1: Sequelize.STRING,
        profissional_formacao_acad_2: Sequelize.STRING,
        profissional_instituicao_2: Sequelize.STRING,
        profissional_grau_formacao_2: Sequelize.STRING,
        profissional_num_carteira_trabalho: Sequelize.STRING,
        profissional_serie_carteira_trabalho: Sequelize.STRING,
        profissional_nis_pis: Sequelize.STRING,
        end_logradouro: Sequelize.STRING,
        end_num: Sequelize.STRING,
        end_complemento: Sequelize.STRING,
        end_bairro: Sequelize.STRING,
        end_cep: Sequelize.STRING,
        end_cidade: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Professor",
        tableName: "professores",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Turma, {
      as: "turmas_horario",
      foreignKey: "professor_id",
      through: "horarios",
    });
    this.belongsToMany(models.Materia, {
      as: "materias_horario",
      foreignKey: "professor_id",
      through: "horarios",
    });
    this.belongsToMany(models.Materia, {
      as: "materias_professor",
      foreignKey: "professor_id",
      through: "professores_materias",
    });
    this.hasMany(models.Horario, {
      as: "professor_horario",
      foreignKey: "professor_id",
    });
    this.hasMany(models.ProfessorMateria, {
      as: "professor_materia",
      foreignKey: "professor_id",
    });
  }
}

export default Professor;
