import Turma from "../../models/Turma";
import Ano from "../../models/Ano";
import Turno from "../../models/Turno";
import Professor from "../../models/Professor";
import Materia from "../../models/Materia";

import { whereFilter } from "../../../utils";

export default new (class IndexTurmaService {
  async run({ filter, limit, page }) {
    let queryWhere = {};

    const queryFields = [
      {
        queryId: 1,
        field: "turma",
        model: Turma,
      },
      {
        queryId: 2,
        field: "turno",
        model: Turno,
        as: "dados_escolares_turno",
        at: {
          model: Turma,
        },
      },
      {
        queryId: 3,
        field: "ano",
        model: Ano,
        as: "dados_escolares_ano",
        at: {
          model: Turma,
        },
      },
      {
        queryId: 4,
        field: "professor_nome",
        model: Professor,
        as: "professores",
        through: true,
        at: {
          model: Turma,
        },
      },
    ];

    if (filter) {
      queryWhere = await whereFilter({
        filter,
        queryFields,
      });
    }

    const turmasFindAndCount = await Turma.findAndCountAll({
      distinct: true,
      where: queryWhere.queryId === 1 && queryWhere.where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: Turno,
          as: "dados_escolares_turno",
          required: !!(queryWhere.queryId === 2),
          duplicating: false,
          where: queryWhere.queryId === 2 && queryWhere.where,
        },
        {
          model: Ano,
          as: "dados_escolares_ano",
          required: !!(queryWhere.queryId === 3),
          duplicating: false,
          where: queryWhere.queryId === 3 && queryWhere.where,
        },
        {
          model: Professor,
          as: "professores",
          required: !!(queryWhere.queryId === 4),
          duplicating: false,
          through: { attributes: [] },
          where: queryWhere.queryId === 4 && queryWhere.where,
        },
        {
          model: Materia,
          as: "materias",
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
