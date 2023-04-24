import Professor from "../../models/Professor";
import Turma from "../../models/Turma";
import Materia from "../../models/Materia";
import Horario from "../../models/Horario";
import Turno from "../../models/Turno";
import Ano from "../../models/Ano";
import Sistema from "../../models/Sistema";

export default new (class ShowProfessorService {
  async run({ id }) {
    const professor = await Professor.findByPk(id, {
      include: [
        {
          model: Horario,
          as: "professor_horario",
          attributes: ["id"],
          include: [
            {
              model: Turma,
              as: "dados_turma",
              attributes: ["turma"],
              include: [
                {
                  model: Turno,
                  as: "dados_turno",
                  attributes: ["turno"],
                },
                {
                  model: Ano,
                  as: "dados_ano",
                  attributes: ["ano"],
                  include: [
                    {
                      model: Sistema,
                      as: "dados_sistema",
                      attributes: ["sistema"],
                    },
                  ],
                },
              ],
            },
            {
              model: Materia,
              as: "materia_horario",
              attributes: ["materia"],
            },
          ],
        },
        {
          model: Materia,
          as: "materias_professor",
          attributes: ["id", "materia"],
          through: { attributes: ["id"] },
        },
      ],
    });

    if (!professor) {
      throw new Error("Professor não existe.");
    }

    return professor;
  }
})();
