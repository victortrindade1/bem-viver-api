module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("turmas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      turma: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ano_id: {
        type: Sequelize.INTEGER,
        references: { model: "anos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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

  down: (queryInterface) => queryInterface.dropTable("turmas"),
};
