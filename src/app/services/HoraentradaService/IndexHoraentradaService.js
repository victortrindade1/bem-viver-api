import { Op } from "sequelize";
import Horaentrada from "../../models/Horaentrada";

export default new (class IndexHoraentradaService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.horaentrada =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Horaentrada.count({ where });

    const horaentradas = await Horaentrada.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return { total, horaentradas };
  }
})();
