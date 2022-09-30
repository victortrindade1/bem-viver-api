module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("professores_materias", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      professor_id: {
        type: Sequelize.INTEGER,
        references: { model: "professores", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      materia_id: {
        type: Sequelize.INTEGER,
        references: { model: "materias", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable("professores_materias"),
};
