import Turma from "../../models/Turma";
import Professor from "../../models/Professor";
import Ano from "../../models/Ano";
import Turno from "../../models/Turno";

export default new (class ShowTurmaService {
  async run({ id }) {
    const turma = await Turma.findByPk(id, {
      include: [
        {
          model: Ano,
          as: "dados_escolares_ano",
          // attributes: ["name", "path", "url"],
        },
        {
          model: Turno,
          as: "dados_escolares_turno",
          // attributes: ["name", "path", "url"],
        },
        {
          model: Professor,
          as: "professores",
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
