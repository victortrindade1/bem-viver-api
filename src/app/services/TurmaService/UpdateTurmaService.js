import Turma from "../../models/Turma";

class UpdateTurmaService {
  async run({ id, turma, ano_id, turno_id, professores, materias }) {
    const request = {
      id,
      turma,
      ano_id,
      turno_id,
    };

    const turmaFound = await Turma.findByPk(id);

    // Verifica se existe turma com este ano ou turno
    const verifyExists = await Turma.findOne({
      where: {
        turma: turno_id ? turmaFound.turma : null,
        turno_id: turno_id || null,
      },
    });

    if (verifyExists) {
      throw new Error("Turma já existe.");
    }

    const response = await turmaFound.update(request);

    // Relação Many-to-Many: Professores e Turmas
    if (professores && professores.length > 0) {
      await response.setProfessores(professores);
    }

    // Relação Many-to-Many: Matérias e Turmas
    if (materias && materias.length > 0) {
      await response.setMaterias(materias);
    }

    return response;
  }
}

export default new UpdateTurmaService();
