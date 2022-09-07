module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("statuspagamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statuspagamento: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("statuspagamentos"),
};
