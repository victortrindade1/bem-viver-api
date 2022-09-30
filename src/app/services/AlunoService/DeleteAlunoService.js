import Aluno from "../../models/Aluno";

export default new (class DeleteAlunoService {
  async run({ id }) {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error("Aluno não existe.");
    }

    await Aluno.destroy({ where: { id } });
  }
})();
