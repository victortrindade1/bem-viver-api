import Professor from "../../models/Professor";
import Sistema from "../../models/Sistema";
import Ano from "../../models/Ano";
import Turma from "../../models/Turma";
import Turno from "../../models/Turno";
import Materia from "../../models/Materia";

import { whereFilter } from "../../../utils";

export default new (class IndexProfessorService {
  async run({ filter, limit, page }) {
    let queryWhere = {};

    const queryFields = [
      {
        queryId: 1,
        field: "professor_nome",
        model: Professor,
      },
      {
        queryId: 2,
        field: "turma",
        model: Turma,
        as: "turmas",
        through: true,
        at: {
          model: Professor,
        },
      },
      {
        queryId: 3,
        field: "ano",
        model: Ano,
        as: "dados_ano",
        at: {
          model: Turma,
          as: "turmas",
          through: true,
          at: {
            model: Professor,
          },
        },
      },
      {
        queryId: 4,
        field: "turno",
        model: Turno,
        as: "dados_turno",
        at: {
          model: Turma,
          as: "turmas",
          through: true,
          at: {
            model: Professor,
          },
        },
      },
      {
        queryId: 5,
        field: "materia",
        model: Materia,
        as: "materias",
        through: true,
        at: {
          model: Professor,
        },
      },
    ];

    if (filter) {
      queryWhere = await whereFilter({
        filter,
        queryFields,
      });
    }

    const professoresFindAndCount = await Professor.findAndCountAll({
      distinct: true,
      where: queryWhere.queryId === 1 && queryWhere.where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: Turma,
          as: "turmas_horario",
          required: !!(
            queryWhere.queryId === 2 ||
            queryWhere.queryId === 3 ||
            queryWhere.queryId === 4
          ),
          duplicating: false,
          through: { attributes: [] },
          where: queryWhere.queryId === 2 && queryWhere.where,
          include: [
            {
              model: Ano,
              as: "dados_ano",
              required: !!(queryWhere.queryId === 3),
              duplicating: false,
              where: queryWhere.queryId === 3 && queryWhere.where,
              include: [
                {
                  model: Sistema,
                  as: "dados_sistema",
                },
              ],
            },
            {
              model: Turno,
              as: "dados_turno",
              required: !!(queryWhere.queryId === 4),
              duplicating: false,
              where: queryWhere.queryId === 4 && queryWhere.where,
            },
            {
              model: Materia,
              as: "materias_horario",
              required: !!(queryWhere.queryId === 5),
              duplicating: false,
              through: { attributes: [] },
              where: queryWhere.queryId === 5 && queryWhere.where,
            },
          ],
        },
        {
          model: Materia,
          as: "materias_professor",
          required: !!(queryWhere.queryId === 5),
          duplicating: false,
          through: { attributes: [] },
          where: queryWhere.queryId === 5 && queryWhere.where,
        },
        // {
        //   model: Materia,
        //   as: "materias_horario",
        //   required: !!(queryWhere.queryId === 5),
        //   duplicating: false,
        //   through: { attributes: [] },
        //   where: queryWhere.queryId === 5 && queryWhere.where,
        // },
      ],
    });

    const total = professoresFindAndCount.count;
    const professores = professoresFindAndCount.rows;

    return { total, professores };
  }
})();
