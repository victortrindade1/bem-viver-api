import { Op } from "sequelize";

import Professor from "../../models/Professor";

export default new (class UpdateProfessorService {
  async run({ id, requestData }) {
    const { turmas, professor_cpf } = requestData;

    const professorExists = await Professor.findByPk(id);

    // Verificar se CPF existe pra outra pessoa
    if (professor_cpf) {
      const cpfExists = await Professor.findOne({
        where: {
          [Op.and]: [
            {
              [Op.not]: [{ id: professorExists.id }],
            },
            { professor_cpf },
          ],
        },
      });

      if (cpfExists) {
        throw new Error("Existe outro professor com este CPF.");
      }
    }

    const professorUpdated = await professorExists.update(requestData);

    // Relação Many-to-Many: Professores e Turmas
    if (turmas && turmas.length > 0) {
      professorUpdated.setTurmas(turmas);
    }

    return professorUpdated;
  }
})();
