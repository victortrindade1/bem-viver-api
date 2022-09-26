import { Op } from "sequelize";

import Turma from "../../models/Turma";
import Ano from "../../models/Ano";
import Turno from "../../models/Turno";

export default new (class IndexTurmaService {
  async run({ filter, limit, page }) {
    const where = {};

    if (filter) {
      where.turma =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${filter}%` }
          : { [Op.iLike]: `%${filter}%` };
    }

    const total = await Turma.count({ where });

    const turmas = await Turma.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      // attributes: ["id", "label", "created_at", "updated_at"],
      include: [
        {
          model: Ano,
          as: "dados_escolares_ano",
          // attributes: ["name", "path", "url"],
        },
        {
          model: Turno,
          as: "dados_escolares_turno",
          // attributes: ["name", "path", "url"],
        },
      ],
    });

    return { total, turmas };
  }
})();
