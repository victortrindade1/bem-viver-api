import { Op } from "sequelize";

import Turno from "../../models/Turno";

export default new (class IndexTurnoService {
  async run({ nameFilter, page, limit }) {
    const where = {};

    if (nameFilter) {
      where.turno =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Turno.count({ where });

    const turnos = await Turno.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return { total, turnos };
  }
})();
