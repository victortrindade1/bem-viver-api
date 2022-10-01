import { Op } from "sequelize";
import Periodo from "../../models/Periodo";

export default new (class IndexPeriodoService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.periodo =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Periodo.count({ where });

    const periodos = await Periodo.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return { total, periodos };
  }
})();
