import { Op } from "sequelize";

import Professor from "../../models/Professor";

export default new (class UpdateProfessorService {
  async run({ id, requestData }) {
    const { turmas, materias, professor_cpf } = requestData;

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

    const professorUpdated = await professorExists.update(requestData);

    // Relação Many-to-Many: Professores e Turmas
    if (turmas && turmas.length > 0) {
      professorUpdated.setTurmas(turmas);
    }

    // Relação Many-to-Many: Professores e Matérias
    if (materias && materias.length > 0) {
      professorUpdated.setMaterias(materias);
    }

    return professorUpdated;
  }
})();
