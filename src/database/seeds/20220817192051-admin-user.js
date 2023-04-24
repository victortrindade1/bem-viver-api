const bcrypt = require("bcryptjs");

module.exports = {
  up: (QueryInterface) =>
    QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          email: "admin@admin.com",
          password_hash: bcrypt.hashSync("123456", 8),
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Testes",
          email: "test@test.com",
          password_hash: bcrypt.hashSync("123456", 8),
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
