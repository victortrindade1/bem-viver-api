import { Op } from "sequelize";

import Professor from "../../models/Professor";
import Horario from "../../models/Horario";
import Turma from "../../models/Turma";
import Turno from "../../models/Turno";
import Ano from "../../models/Ano";
import Sistema from "../../models/Sistema";
import Materia from "../../models/Materia";

export default new (class UpdateProfessorService {
  async run({ id, requestData }) {
    const { professor_cpf, materias } = requestData;

    // Verificar se CPF existe pra outra pessoa
    if (professor_cpf) {
      const cpfExists = await Professor.findOne({
        where: {
          [Op.and]: [
            {
              [Op.not]: [{ id }],
            },
            { professor_cpf },
          ],
        },
      });

      if (cpfExists) {
        throw new Error("Existe outro professor com este CPF.");
      }
    }

    const professorExists = await Professor.findByPk(id);

    const professor = await professorExists.update(requestData);

    // Relação Many-to-Many: Professores e Matérias
    if (materias && materias.length > 0) {
      await professor.addMaterias_professor(materias);
    }

    const professorUpdated = await Professor.findByPk(id, {
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
          attributes: ["materia"],
          through: { attributes: [] },
        },
      ],
    });

    return professorUpdated;
  }
})();
