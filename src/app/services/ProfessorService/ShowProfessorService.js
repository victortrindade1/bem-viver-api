import Professor from "../../models/Professor";
import Turma from "../../models/Turma";
import Materia from "../../models/Materia";

export default new (class ShowProfessorService {
  async run({ id }) {
    const professor = await Professor.findByPk(id, {
      include: [
        {
          model: Turma,
          as: "turmas",
          through: { attributes: [] }, // hide join relation
        },
        {
          model: Materia,
          as: "materias",
          through: { attributes: [] }, // hide join relation
        },
      ],
    });

    if (!professor) {
      throw new Error("Professor não existe.");
    }

    return professor;
  }
})();
