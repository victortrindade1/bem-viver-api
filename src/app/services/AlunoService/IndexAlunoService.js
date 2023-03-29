import Aluno from "../../models/Aluno";
import Sistema from "../../models/Sistema";
import Ano from "../../models/Ano";
import Turma from "../../models/Turma";

import { whereFilter } from "../../../utils";

export default new (class IndexAlunoService {
  async run({ filter, limit, page, order }) {
    let queryWhere = {};

    const queryFields = [
      {
        queryId: 1,
        field: "nome",
        model: Aluno,
      },
      {
        queryId: 2,
        field: "matricula",
        model: Aluno,
      },
      {
        queryId: 3,
        field: "sistema",
        model: Sistema,
        as: "dados_sistema",
        at: {
          model: Ano,
          as: "dados_ano",
          at: {
            model: Turma,
            as: "dados_turma",
            at: {
              model: Aluno,
            },
          },
        },
      },
      {
        queryId: 4,
        field: "ano",
        model: Ano,
        as: "dados_ano",
        at: {
          model: Turma,
          as: "dados_turma",
          at: {
            model: Aluno,
          },
        },
      },
      {
        queryId: 5,
        field: "turma",
        model: Turma,
        as: "dados_turma",
        at: {
          model: Aluno,
        },
      },
      {
        queryId: 6,
        field: "statuspagamento",
        model: Aluno,
      },
    ];

    if (filter) {
      queryWhere = await whereFilter({
        filter,
        queryFields,
      });
    }

    const alunosFindAndCount = await Aluno.findAndCountAll({
      distinct: true,
      where:
        (queryWhere.queryId === 0 || // Este pro caso de não achar nada
          queryWhere.queryId === 1 ||
          queryWhere.queryId === 2 ||
          queryWhere.queryId === 6) &&
        queryWhere.where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", order]],
      include: [
        {
          model: Turma,
          as: "dados_turma",
          required: !!(
            queryWhere.queryId === 3 ||
            queryWhere.queryId === 4 ||
            queryWhere.queryId === 5
          ),
          duplicating: false,
          where: queryWhere.queryId === 5 && queryWhere.where,
          include: [
            {
              model: Ano,
              as: "dados_ano",
              required: !!(
                queryWhere.queryId === 3 || queryWhere.queryId === 4
              ),
              duplicating: false,
              where: queryWhere.queryId === 4 && queryWhere.where,
              include: [
                {
                  model: Sistema,
                  as: "dados_sistema",
                  required: true,
                  duplicating: false,
                  where: queryWhere.queryId === 3 && queryWhere.where,
                },
              ],
            },
          ],
        },
      ],
    });

    const total = alunosFindAndCount.count;
    const alunos = alunosFindAndCount.rows;

    return {
      total,
      alunos,
    };
  }
})();
