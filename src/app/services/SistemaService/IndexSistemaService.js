import { Op } from "sequelize";
import Sistema from "../../models/Sistema";

export default new (class IndexSistemaService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.sistema =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Sistema.count({ where });

    const sistemas = await Sistema.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return { total, sistemas };
  }
})();
