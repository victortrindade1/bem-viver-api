import Sequelize, { Model } from "sequelize";

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        ativo: Sequelize.BOOLEAN,
        matricula: Sequelize.BIGINT,
        nome: Sequelize.STRING,
        status: Sequelize.STRING,
        dados_pessoais_rg: Sequelize.STRING,
        dados_pessoais_cpf: Sequelize.STRING,
        dados_pessoais_data_nascimento: Sequelize.STRING,
        dados_pessoais_num_certidao: Sequelize.STRING,
        dados_pessoais_folha_certidao: Sequelize.STRING,
        dados_pessoais_livro_certidao: Sequelize.STRING,
        contatos_pai_nome: Sequelize.STRING,
        contatos_pai_rg: Sequelize.STRING,
        contatos_pai_cpf: Sequelize.STRING,
        contatos_pai_cnpj: Sequelize.STRING,
        contatos_pai_data_nascimento: Sequelize.STRING,
        contatos_pai_tel: Sequelize.STRING,
        contatos_pai_cel: Sequelize.STRING,
        contatos_pai_email: Sequelize.STRING,
        contatos_mae_nome: Sequelize.STRING,
        contatos_mae_rg: Sequelize.STRING,
        contatos_mae_cpf: Sequelize.STRING,
        contatos_mae_cnpj: Sequelize.STRING,
        contatos_mae_data_nascimento: Sequelize.STRING,
        contatos_mae_tel: Sequelize.STRING,
        contatos_mae_cel: Sequelize.STRING,
        contatos_mae_email: Sequelize.STRING,
        contatos_resp_nome: Sequelize.STRING,
        contatos_resp_rg: Sequelize.STRING,
        contatos_resp_cpf: Sequelize.STRING,
        contatos_resp_cnpj: Sequelize.STRING,
        contatos_resp_tel: Sequelize.STRING,
        contatos_resp_cel: Sequelize.STRING,
        contatos_resp_email: Sequelize.STRING,
        contatos_end_logradouro: Sequelize.STRING,
        contatos_end_num: Sequelize.STRING,
        contatos_end_complemento: Sequelize.STRING,
        contatos_end_bairro: Sequelize.STRING,
        contatos_end_cep: Sequelize.STRING,
        contatos_end_cidade: Sequelize.STRING,
        contatos_buscar1_nome: Sequelize.STRING,
        contatos_buscar1_parentesco: Sequelize.STRING,
        contatos_buscar1_contato: Sequelize.STRING,
        contatos_buscar2_nome: Sequelize.STRING,
        contatos_buscar2_parentesco: Sequelize.STRING,
        contatos_buscar2_contato: Sequelize.STRING,
        contatos_buscar3_nome: Sequelize.STRING,
        contatos_buscar3_parentesco: Sequelize.STRING,
        contatos_buscar3_contato: Sequelize.STRING,
        dados_escolares_sistema: Sequelize.STRING,
        // dados_escolares_turma: Sequelize.STRING,
        dados_escolares_turno: Sequelize.STRING,
        dados_escolares_horario_entrada: Sequelize.STRING,
        dados_escolares_horario_saida: Sequelize.STRING,
        // dados_escolares_ano: Sequelize.STRING,
        dados_escolares_periodo: Sequelize.STRING,
        dados_escolares_data_pre_matricula: Sequelize.STRING,
        dados_escolares_data_matricula: Sequelize.STRING,
        dados_escolares_observacoes: Sequelize.STRING,
        anamnese_pediatra: Sequelize.STRING,
        anamnese_contato_pediatra: Sequelize.STRING,
        anamnese_alergias: Sequelize.STRING,
        anamnese_medicacao: Sequelize.STRING,
        anamnese_temperatura_banho: Sequelize.STRING,
        anamnese_observacoes: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // this.hasMany(models.Turma, {
    //   foreignKey: "turma_id",
    //   as: "dados_escolares_turma",
    // });
    this.belongsTo(models.Turma, {
      foreignKey: "turma_id",
      as: "dados_escolares_turma",
    });
  }
}

export default Aluno;
