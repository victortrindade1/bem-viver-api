import Aluno from "../../models/Aluno";

export default new (class UpdateAlunoService {
  async run({ id, requestData }) {
    const aluno = await Aluno.findByPk(id);

    const alunoUpdated = await aluno.update(requestData);

    return alunoUpdated;
  }
})();
