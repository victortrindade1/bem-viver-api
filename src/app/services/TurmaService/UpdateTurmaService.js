import Turma from "../../models/Turma";

class UpdateTurmaService {
  async run({ id, turma, ano_id, turno_id }) {
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

    return response;
  }
}

export default new UpdateTurmaService();
