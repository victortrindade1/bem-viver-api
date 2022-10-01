import { Op } from "sequelize";
import Horasaida from "../../models/Horasaida";

export default new (class IndexHorasaidaService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.horasaida =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Horasaida.count({ where });

    const horasaidas = await Horasaida.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return { total, horasaidas };
  }
})();
