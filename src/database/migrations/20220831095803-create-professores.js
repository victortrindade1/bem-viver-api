module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("professores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // turma_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: "turmas", key: "id" },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      //   allowNull: true,
      // },
      // materia_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: "materias", key: "id" },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      //   allowNull: true,
      // },
      professor_nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      professor_cpf: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      professor_rg: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      professor_data_nascimento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_registro_cfep: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_formacao_acad_1: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_instituicao_1: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_grau_formacao_1: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_formacao_acad_2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_instituicao_2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_grau_formacao_2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_num_carteira_trabalho: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_serie_carteira_trabalho: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profissional_nis_pis: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_logradouro: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_num: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_complemento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_bairro: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_cep: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_cidade: {
        allowNull: true,
        type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable("professores"),
};
