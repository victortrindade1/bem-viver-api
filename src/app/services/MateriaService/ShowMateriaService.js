import Materia from "../../models/Materia";
import Professor from "../../models/Professor";

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
      ],
    });

    if (!materia) {
      throw new Error("Matéria não existe.");
    }

    return materia;
  }
})();
