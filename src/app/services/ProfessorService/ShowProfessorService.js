import Professor from "../../models/Professor";
import Turma from "../../models/Turma";
import Materia from "../../models/Materia";

export default new (class ShowProfessorService {
  async run({ id }) {
    const professor = await Professor.findByPk(id, {
      include: [
        {
          model: Turma,
          as: "turmas_horario",
          through: { attributes: [] }, // hide join relation
          include: [
            {
              model: Materia,
              as: "materias_horario",
              through: { attributes: [] }, // hide join relation
            },
          ],
        },
        {
          model: Materia,
          as: "materias_professor",
          through: { attributes: [] }, // hide join relation
        },
        // {
        //   model: Materia,
        //   as: "materias_horario",
        //   through: { attributes: [] }, // hide join relation
        // },
      ],
    });

    if (!professor) {
      throw new Error("Professor não existe.");
    }

    return professor;
  }
})();
