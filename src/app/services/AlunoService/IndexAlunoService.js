import { Op } from "sequelize";

import Aluno from "../../models/Aluno";
import Sistema from "../../models/Sistema";
import Ano from "../../models/Ano";
import Turma from "../../models/Turma";

// import { whereFilter } from "../../../utils";
// import whereFilter from "../../../utils/whereBuilder";

export default new (class IndexAlunoService {
  async run({ filter, limit, page, order, field }) {
    // console.log({ field });

    const whereAluno = {};
    const whereTurma = {};
    const whereAno = {};
    const whereSistema = {};

    switch (field) {
      case "Nome":
        whereAluno.nome = { [Op.iLike]: `%${filter}%` };
        break;
      case "Matrícula":
        whereAluno.matricula = { [Op.iLike]: `%${filter}%` };
        break;
      case "Turma":
        whereTurma.turma = { [Op.iLike]: `%${filter}%` };
        break;
      case "Ano":
        whereAno.ano = { [Op.iLike]: `%${filter}%` };
        break;
      case "Sistema":
        whereSistema.sistema = { [Op.iLike]: `%${filter}%` };
        break;
      case "Status":
        whereAluno.statuspagamento = { [Op.iLike]: `%${filter}%` };
        break;
      default:
        break;
    }

    // let queryWhere = {};

    // const queryFields = [
    //   {
    //     queryId: 1,
    //     field: "nome",
    //     model: Aluno,
    //   },
    //   {
    //     queryId: 2,
    //     field: "matricula",
    //     model: Aluno,
    //   },
    //   {
    //     queryId: 3,
    //     field: "sistema",
    //     model: Sistema,
    //     as: "dados_sistema",
    //     at: {
    //       model: Ano,
    //       as: "dados_ano",
    //       at: {
    //         model: Turma,
    //         as: "dados_turma",
    //         at: {
    //           model: Aluno,
    //         },
    //       },
    //     },
    //   },
    //   {
    //     queryId: 4,
    //     field: "ano",
    //     model: Ano,
    //     as: "dados_ano",
    //     at: {
    //       model: Turma,
    //       as: "dados_turma",
    //       at: {
    //         model: Aluno,
    //       },
    //     },
    //   },
    //   {
    //     queryId: 5,
    //     field: "turma",
    //     model: Turma,
    //     as: "dados_turma",
    //     at: {
    //       model: Aluno,
    //     },
    //   },
    //   {
    //     queryId: 6,
    //     field: "statuspagamento",
    //     model: Aluno,
    //   },
    // ];

    // if (filter) {
    //   queryWhere = await whereFilter({
    //     filter,
    //     queryFields,
    //   });
    // }
    // console.log({ queryWhere });
    const alunosFindAndCount = await Aluno.findAndCountAll({
      distinct: true,
      where: whereAluno,
      // (queryWhere.queryId === 0 || // Este pro caso de não achar nada
      //   queryWhere.queryId === 1 ||
      //   queryWhere.queryId === 2 ||
      //   queryWhere.queryId === 6) &&
      // queryWhere.where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", order]],
      include: [
        {
          model: Turma,
          as: "dados_turma",
          required: !!(
            field === "Turma" ||
            field === "Ano" ||
            field === "Sistema"
          ),
          // queryWhere.queryId === 3 ||
          // queryWhere.queryId === 4 ||
          // queryWhere.queryId === 5
          // ),
          duplicating: false,
          where: whereTurma,
          // where: queryWhere.queryId === 5 && queryWhere.where,
          include: [
            {
              model: Ano,
              as: "dados_ano",
              required: !!(
                (field === "Ano" || field === "Sistema")
                // queryWhere.queryId === 3 || queryWhere.queryId === 4
              ),
              duplicating: false,
              where: whereAno,
              // where: queryWhere.queryId === 4 && queryWhere.where,
              include: [
                {
                  model: Sistema,
                  as: "dados_sistema",
                  required: !!(field === "Sistema"),
                  duplicating: false,
                  where: whereSistema,
                  // where: queryWhere.queryId === 3 && queryWhere.where,
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
