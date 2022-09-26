import Turma from "../../models/Turma";

class StoreTurmaService {
  async run({ turma, ano_id }) {
    const request = {
      turma,
      ano_id,
    };

    const verifyExists = await Turma.findOne({
      where: ano_id
        ? {
            turma,
            ano_id,
          }
        : {
            turma,
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
