import { Op } from "sequelize";

import Materia from "../../models/Materia";

export default new (class UpdateMateriaService {
  async run({ id, materia, professores, turmas }) {
    const request = {
      materia,
    };

    const materiaExists = await Materia.findByPk(id);

    const findAnother = await Materia.findOne({
      where: {
        [Op.and]: [
          {
            [Op.not]: [{ id: materiaExists.id }],
          },
          { materia },
        ],
      },
    });

    if (findAnother) {
      throw new Error("Existe outra matéria com este nome.");
    }

    const materiaUpdated = await materiaExists.update(request);

    // Relação Many-to-Many: Professores e Matérias
    if (professores && professores.length > 0) {
      materiaUpdated.setProfessores(professores);
    }

    // Relação Many-to-Many: Turmas e Matérias
    if (turmas && turmas.length > 0) {
      materiaUpdated.setTurmas(turmas);
    }

    return materiaUpdated;
  }
})();
