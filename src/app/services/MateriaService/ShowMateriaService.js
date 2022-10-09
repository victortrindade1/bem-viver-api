import Materia from "../../models/Materia";
import Professor from "../../models/Professor";
import Turma from "../../models/Turma";

export default new (class ShowMateriaService {
  async run({ id }) {
    const materia = await Materia.findByPk(id, {
      include: [
        {
          model: Professor,
          as: "professores",
          duplicating: false,
          through: { attributes: [] },
        },
        {
          model: Turma,
          as: "turmas",
          duplicating: false,
          through: { attributes: [] },
        },
      ],
    });

    if (!materia) {
      throw new Error("Matéria não existe.");
    }

    return materia;
  }
})();
