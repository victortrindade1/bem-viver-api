import Turma from "../../models/Turma";
import Professor from "../../models/Professor";
import Materia from "../../models/Materia";
import Ano from "../../models/Ano";
import Turno from "../../models/Turno";

export default new (class ShowTurmaService {
  async run({ id }) {
    const turma = await Turma.findByPk(id, {
      include: [
        {
          model: Ano,
          as: "dados_ano",
          // attributes: ["name", "path", "url"],
        },
        {
          model: Turno,
          as: "dados_turno",
          // attributes: ["name", "path", "url"],
        },
        {
          model: Professor,
          as: "professores_horario",
          through: { attributes: [] }, // hide join relation
        },
        {
          model: Materia,
          as: "materias_horario",
          through: { attributes: [] }, // hide join relation
        },
      ],
    });

    if (!turma) {
      throw new Error("Turma não existe.");
    }

    return turma;
  }
})();
