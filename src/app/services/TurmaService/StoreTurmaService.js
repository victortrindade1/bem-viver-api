import Turma from "../../models/Turma";

class StoreTurmaService {
  async run({ turma, ano_id, turno_id }) {
    const request = {
      turma,
      ano_id,
      turno_id,
    };

    const verifyExists = await Turma.findOne({
      where: {
        ano_id: ano_id || null,
        turma,
        turno_id: turno_id || null,
      },
    });

    if (verifyExists) {
      throw new Error("Turma já existe.");
    }

    const { id } = await Turma.create(request);

    return id;
  }
}

export default new StoreTurmaService();
