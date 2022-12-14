import Aluno from "../../models/Aluno";

import statusPagamento from "../../../lib/constants";

export default new (class StoreAlunoService {
  async run({
    matricula,
    nome,
    dados_escolares_data_matricula,
    dados_escolares_data_pre_matricula,
    dados_pessoais_data_nascimento,
  }) {
    const alunoExists = await Aluno.findOne({
      where: {
        // matricula: matricula || null,
        nome,
        dados_pessoais_data_nascimento: dados_pessoais_data_nascimento || null,
      },
    });

    if (alunoExists) {
      throw new Error("Nome já existe.");
    }

    const alunoRequest = {
      nome,
      matricula,
      dados_escolares_data_matricula,
      dados_escolares_data_pre_matricula,
      dados_pessoais_data_nascimento,
      ativo: true,
      statuspagamento:
        dados_escolares_data_pre_matricula && !dados_escolares_data_matricula
          ? statusPagamento[5].status // 5 = Pré Matr.
          : statusPagamento[1].status, // 1 = Sem Pgto
    };

    const aluno = await Aluno.create(alunoRequest);

    return aluno;
  }
})();
