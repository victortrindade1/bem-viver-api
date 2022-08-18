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
          isAdmin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: () => {},
};
