import Turma from "../../models/Turma";

class UpdateTurmaService {
  async run({ id, turma, ano_id }) {
    const request = {
      id,
      turma,
      ano_id,
    };

    const turmaExists = await Turma.findByPk(id);

    const response = await turmaExists.update(request);

    return response;
  }
}

export default new UpdateTurmaService();
