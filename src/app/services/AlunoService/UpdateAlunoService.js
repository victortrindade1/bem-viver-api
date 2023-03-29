import Aluno from "../../models/Aluno";
import Turma from "../../models/Turma";
import Turno from "../../models/Turno";
import Ano from "../../models/Ano";
import Sistema from "../../models/Sistema";
import Periodo from "../../models/Periodo";
import Horaentrada from "../../models/Horaentrada";
import Horasaida from "../../models/Horasaida";

import { capitalizeFirstLetter } from "../../../utils";

export default new (class UpdateAlunoService {
  async run({ id, requestData }) {
    const aluno = await Aluno.findByPk(id);

    const {
      ativo,
      nome,
      matricula,
      statuspagamento,
      dados_pessoais_rg,
      dados_pessoais_cpf,
      dados_pessoais_data_nascimento,
      dados_pessoais_num_certidao,
      dados_pessoais_folha_certidao,
      dados_pessoais_livro_certidao,
      contatos_pai_nome,
      contatos_pai_rg,
      contatos_pai_cpf,
      contatos_pai_cnpj,
      contatos_pai_data_nascimento,
      contatos_pai_tel,
      contatos_pai_cel,
      contatos_pai_email,
      contatos_mae_nome,
      contatos_mae_rg,
      contatos_mae_cpf,
      contatos_mae_cnpj,
      contatos_mae_data_nascimento,
      contatos_mae_tel,
      contatos_mae_cel,
      contatos_mae_email,
      contatos_resp_nome,
      contatos_resp_rg,
      contatos_resp_cpf,
      contatos_resp_cnpj,
      contatos_resp_tel,
      contatos_resp_cel,
      contatos_resp_email,
      contatos_end_logradouro,
      contatos_end_num,
      contatos_end_complemento,
      contatos_end_bairro,
      contatos_end_cep,
      contatos_end_cidade,
      contatos_buscar1_nome,
      contatos_buscar1_parentesco,
      contatos_buscar1_contato,
      contatos_buscar2_nome,
      contatos_buscar2_parentesco,
      contatos_buscar2_contato,
      contatos_buscar3_nome,
      contatos_buscar3_parentesco,
      contatos_buscar3_contato,
      // dados_sistema,
      // dados_turma,
      // dados_turno,
      // dados_ano,
      turma_id,
      horaentrada_id,
      horasaida_id,
      periodo_id,
      dados_escolares_data_pre_matricula,
      dados_escolares_data_matricula,
      dados_escolares_data_encerramento,
      dados_escolares_observacoes,
      anamnese_pediatra,
      anamnese_contato_pediatra,
      anamnese_alergias,
      anamnese_medicacao,
      anamnese_temperatura_banho,
      anamnese_observacoes,
    } = requestData;
    await aluno.update({
      ativo,
      nome: nome && capitalizeFirstLetter(nome),
      matricula,
      statuspagamento,
      dados_pessoais_rg,
      dados_pessoais_cpf,
      dados_pessoais_data_nascimento,
      dados_pessoais_num_certidao,
      dados_pessoais_folha_certidao,
      dados_pessoais_livro_certidao,
      contatos_pai_nome,
      contatos_pai_rg,
      contatos_pai_cpf,
      contatos_pai_cnpj,
      contatos_pai_data_nascimento,
      contatos_pai_tel,
      contatos_pai_cel,
      contatos_pai_email,
      contatos_mae_nome,
      contatos_mae_rg,
      contatos_mae_cpf,
      contatos_mae_cnpj,
      contatos_mae_data_nascimento,
      contatos_mae_tel,
      contatos_mae_cel,
      contatos_mae_email,
      contatos_resp_nome,
      contatos_resp_rg,
      contatos_resp_cpf,
      contatos_resp_cnpj,
      contatos_resp_tel,
      contatos_resp_cel,
      contatos_resp_email,
      contatos_end_logradouro,
      contatos_end_num,
      contatos_end_complemento,
      contatos_end_bairro,
      contatos_end_cep,
      contatos_end_cidade,
      contatos_buscar1_nome,
      contatos_buscar1_parentesco,
      contatos_buscar1_contato,
      contatos_buscar2_nome,
      contatos_buscar2_parentesco,
      contatos_buscar2_contato,
      contatos_buscar3_nome,
      contatos_buscar3_parentesco,
      contatos_buscar3_contato,
      turma_id,
      horaentrada_id,
      horasaida_id,
      periodo_id,
      // dados_turma,
      // dados_turno,
      // dados_ano,
      // dados_sistema,
      dados_escolares_data_pre_matricula,
      dados_escolares_data_matricula,
      dados_escolares_data_encerramento,
      dados_escolares_observacoes,
      anamnese_pediatra,
      anamnese_contato_pediatra,
      anamnese_alergias,
      anamnese_medicacao,
      anamnese_temperatura_banho,
      anamnese_observacoes,
    });

    const alunoUpdated = await Aluno.findByPk(id, {
      include: [
        {
          model: Turma,
          as: "dados_turma",
          include: [
            {
              model: Turno,
              as: "dados_turno",
            },
            {
              model: Ano,
              as: "dados_ano",
              include: [
                {
                  model: Sistema,
                  as: "dados_sistema",
                },
              ],
            },
          ],
        },
        {
          model: Periodo,
          as: "dados_periodo",
        },
        {
          model: Horaentrada,
          as: "dados_horaentrada",
        },
        {
          model: Horasaida,
          as: "dados_horasaida",
        },
        // {
        //   model:
        // }
      ],
    });
    return alunoUpdated;
  }
})();
