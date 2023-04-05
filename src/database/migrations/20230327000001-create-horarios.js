module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("horarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      diahora: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isDate: true,
          isBetween(value) {
            const startDate = new Date("1996-01-01");
            const endDate = new Date("1996-01-08");

            if (value < startDate || value > endDate) {
              throw new Error(
                "O dia da semana está fora do intervalo correto."
              );
            }
          },
        },
      },
      turma_id: {
        type: Sequelize.INTEGER,
        references: { model: "turmas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable("horarios"),
};
