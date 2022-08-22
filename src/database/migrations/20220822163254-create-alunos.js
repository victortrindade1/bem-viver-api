module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("alunos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      matricula: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      nome: {
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable("alunos"),
};
