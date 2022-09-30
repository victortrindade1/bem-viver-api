import Sequelize, { Model } from "sequelize";

class Professor extends Model {
  static init(sequelize) {
    super.init(
      {
        professor_nome: Sequelize.STRING,
        professor_cpf: Sequelize.STRING,
        professor_rg: Sequelize.STRING,
        professor_data_nascimento: Sequelize.STRING,
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
      foreignKey: "professor_id",
      as: "turmas",
      through: "professores_turmas",
    });
  }
}

export default Professor;
