import Turma from "../../models/Turma";

export default new (class DeleteTurmaService {
  async run({ id }) {
    const turma = await Turma.findByPk(id);

    if (!turma) {
      throw new Error("Turma não existe.");
    }

    await Turma.destroy({ where: { id } });
  }
})();
