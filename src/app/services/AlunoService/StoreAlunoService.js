import Aluno from "../../models/Aluno";

import statusPagamento from "../../../lib/constants";

export default new (class StoreAlunoService {
  async run({ matricula, nome, dataMatricula, dataPreMatricula }) {
    const alunoExists = await Aluno.findOne({
      where: { matricula },
    });

    if (alunoExists) {
      throw new Error("Matrícula já existe.");
    }

    const alunoRequest = {
      nome,
      matricula,
      dataMatricula,
      dataPreMatricula,
      ativo: true,
      statuspagamento:
        dataPreMatricula && !dataMatricula
          ? statusPagamento[5].status // 5 = Pré Matr.
          : statusPagamento[1].status, // 1 = Sem Pgto
    };

    const aluno = await Aluno.create(alunoRequest);

    return aluno;
  }
})();
