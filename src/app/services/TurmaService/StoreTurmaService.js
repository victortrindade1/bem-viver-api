import Turma from "../../models/Turma";
import ShowTurmaService from "./ShowTurmaService";

class StoreTurmaService {
  async run({ turma, ano_id, turno_id }) {
    const request = {
      turma,
      ano_id,
      turno_id,
    };

    const verifyExists = await Turma.findOne({
      where: {
        turma,
        turno_id,
        ano_id,
      },
    });

    if (verifyExists) {
      throw new Error("Turma já existe.");
    }

    const newTurma = await Turma.create(request);

    const turmaCreated = await ShowTurmaService.run({ id: newTurma.id });

    return turmaCreated;
  }
}

export default new StoreTurmaService();
