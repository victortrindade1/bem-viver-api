module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("anos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ano: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sistema_id: {
        type: Sequelize.INTEGER,
        references: { model: "sistemas", key: "id" },
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

  down: (queryInterface) => queryInterface.dropTable("anos"),
};
