import { Op } from "sequelize";

import Materia from "../../models/Materia";
import Professor from "../../models/Professor";
import Turma from "../../models/Turma";

export default new (class IndexMateriaService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.materia =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Materia.count({ where });

    const materias = await Materia.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: Professor,
          as: "professores",
          // required: true,
          duplicating: false,
          through: { attributes: [] },
        },
        {
          model: Turma,
          as: "turmas",
          // required: true,
          duplicating: false,
          through: { attributes: [] },
        },
      ],
    });

    return { total, materias };
  }
})();
