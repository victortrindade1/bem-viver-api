import Aluno from "../../models/Aluno";

import { capitalizeFirstLetter } from "../../../utils";
import statusPagamento from "../../../lib/constants";

export default new (class StoreAlunoService {
  async run({
    matricula,
    nome,
    dados_escolares_data_matricula,
    dados_escolares_data_pre_matricula,
    dados_pessoais_data_nascimento,
  }) {
    // Se tiver primeira letra minúscula, troca
    const nomeCapitalized = capitalizeFirstLetter(nome);

    const alunoExists = await Aluno.findOne({
      where: {
        // matricula: matricula || null,
        nome: nomeCapitalized,
        dados_pessoais_data_nascimento: dados_pessoais_data_nascimento || null,
      },
    });

    if (alunoExists) {
      throw new Error("Este aluno já existe.");
    }

    const matriculaExists = await Aluno.findOne({
      where: {
        matricula,
      },
    });

    if (matriculaExists) {
      throw new Error("Esta matrícula já existe.");
    }

    const alunoRequest = {
      nome: nomeCapitalized,
      matricula,
      dados_escolares_data_matricula,
      dados_escolares_data_pre_matricula,
      dados_pessoais_data_nascimento,
      ativo: true,
      statuspagamento:
        dados_escolares_data_pre_matricula && !dados_escolares_data_matricula
          ? statusPagamento[4].status // 4 = Pré Matr.
          : statusPagamento[0].status, // 0 = Sem Pgto
    };

    const aluno = await Aluno.create(alunoRequest);

    return aluno;
  }
})();
