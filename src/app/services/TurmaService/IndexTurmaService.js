import { Op } from "sequelize";

import Turma from "../../models/Turma";
import Ano from "../../models/Ano";
import Turno from "../../models/Turno";
// import Professor from "../../models/Professor";
import Materia from "../../models/Materia";
import Sistema from "../../models/Sistema";
// import Horario from "../../models/Horario";

// import { whereFilter } from "../../../utils";

export default new (class IndexTurmaService {
  async run({ filter, limit, page }) {
    const where = {};

    if (filter) {
      where.turma =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${filter}%` }
          : { [Op.iLike]: `%${filter}%` };
    }

    const turmasFindAndCount = await Turma.findAndCountAll({
      distinct: true,
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: Turno,
          as: "dados_turno",
        },
        {
          model: Ano,
          as: "dados_ano",
          include: [
            {
              model: Sistema,
              as: "dados_sistema",
            },
          ],
        },
        {
          model: Materia,
          as: "materias_horario",
          duplicating: false,
          through: { attributes: [] },
        },
      ],
    });

    const total = turmasFindAndCount.count;
    const turmas = turmasFindAndCount.rows;

    return { total, turmas };
  }
})();
