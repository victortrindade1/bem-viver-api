import { Op } from "sequelize";

import User from "../../models/User";
import File from "../../models/File";

class IndexUserService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.name =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await User.count({ where });

    const users = await User.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "name",
        "email",
        "is_admin",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: File,
          as: "avatar",
          atributes: ["id", "name", "path", "url"],
        },
      ],
    });

    return { total, users };
  }
}

export default new IndexUserService();
