import { Op } from "sequelize";

import Ano from "../../models/Ano";
import Sistema from "../../models/Sistema";

export default new (class IndexAnoService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.ano =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Ano.count({ where });

    const anos = await Ano.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: Sistema,
          as: "dados_sistema",
        },
      ],
    });

    return { total, anos };
  }
})();
