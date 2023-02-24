module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("alunos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      matricula: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      statuspagamento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      // statuspagamento_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: "statuspagamentos", key: "id" },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      //   allowNull: true,
      // },
      dados_pessoais_rg: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      dados_pessoais_cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      dados_pessoais_data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dados_pessoais_num_certidao: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      dados_pessoais_folha_certidao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dados_pessoais_livro_certidao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_tel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_cel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_pai_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_tel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_cel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_mae_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_tel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_cel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_resp_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_end_logradouro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_end_num: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_end_complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_end_bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_end_cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_end_cidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar1_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar1_parentesco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar1_contato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar2_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar2_parentesco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar2_contato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar3_nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar3_parentesco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contatos_buscar3_contato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      turma_id: {
        type: Sequelize.INTEGER,
        references: { model: "turmas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      horaentrada_id: {
        type: Sequelize.INTEGER,
        references: { model: "horaentradas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      horasaida_id: {
        type: Sequelize.INTEGER,
        references: { model: "horasaidas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      // turno_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: "turnos", key: "id" },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      //   allowNull: true,
      // },
      periodo_id: {
        type: Sequelize.INTEGER,
        references: { model: "periodos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      dados_escolares_data_pre_matricula: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dados_escolares_data_matricula: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dados_escolares_observacoes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anamnese_pediatra: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anamnese_contato_pediatra: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anamnese_alergias: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anamnese_medicacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anamnese_temperatura_banho: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anamnese_observacoes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("alunos"),
};
