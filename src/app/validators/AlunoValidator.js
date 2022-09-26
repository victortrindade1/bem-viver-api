import * as Yup from "yup";
import statusPagamento from "../../lib/constants";

export const validateAlunoStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      matricula: Yup.number().required(),
      dados_escolares_data_matricula: Yup.string().when(
        "dados_escolares_data_pre_matricula",
        (dados_escolares_data_pre_matricula, field) =>
          dados_escolares_data_pre_matricula ? field : field.required()
      ),
      dados_escolares_data_pre_matricula: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateAlunoUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      ativo: Yup.boolean(),
      matricula: Yup.number(),
      nome: Yup.string(),
      statuspagamento: Yup.string().oneOf(
        statusPagamento.map((item) => item.status)
      ),
      dados_pessoais_rg: Yup.string(),
      dados_pessoais_cpf: Yup.string()
        .min(11, "CPF precisa ter 11 caracteres")
        .max(11, "CPF precisa ter 11 caracteres"),
      dados_pessoais_data_nascimento: Yup.string(),
      dados_pessoais_num_certidao: Yup.string(),
      dados_pessoais_folha_certidao: Yup.string(),
      dados_pessoais_livro_certidao: Yup.string(),
      contatos_pai_nome: Yup.string(),
      contatos_pai_rg: Yup.string(),
      contatos_pai_cpf: Yup.string()
        .min(11, "CPF precisa ter 11 caracteres")
        .max(11, "CPF precisa ter 11 caracteres"),
      contatos_pai_cnpj: Yup.string()
        .min(15, "CNPJ precisa ter 15 caracteres")
        .max(15, "CNPJ precisa ter 15 caracteres"),
      contatos_pai_data_nascimento: Yup.string(),
      contatos_pai_tel: Yup.string(),
      contatos_pai_cel: Yup.string(),
      contatos_pai_email: Yup.string().email(),
      contatos_mae_nome: Yup.string(),
      contatos_mae_rg: Yup.string(),
      contatos_mae_cpf: Yup.string()
        .min(11, "CPF precisa ter 11 caracteres")
        .max(11, "CPF precisa ter 11 caracteres"),
      contatos_mae_cnpj: Yup.string()
        .min(15, "CNPJ precisa ter 15 caracteres")
        .max(15, "CNPJ precisa ter 15 caracteres"),
      contatos_mae_data_nascimento: Yup.string(),
      contatos_mae_tel: Yup.string(),
      contatos_mae_cel: Yup.string(),
      contatos_mae_email: Yup.string().email(),
      contatos_resp_nome: Yup.string(),
      contatos_resp_rg: Yup.string(),
      contatos_resp_cpf: Yup.string()
        .min(11, "CPF precisa ter 11 caracteres")
        .max(11, "CPF precisa ter 11 caracteres"),
      contatos_resp_cnpj: Yup.string()
        .min(15, "CNPJ precisa ter 15 caracteres")
        .max(15, "CNPJ precisa ter 15 caracteres"),
      contatos_resp_tel: Yup.string(),
      contatos_resp_cel: Yup.string(),
      contatos_resp_email: Yup.string().email(),
      contatos_end_logradouro: Yup.string(),
      contatos_end_num: Yup.string(),
      contatos_end_complemento: Yup.string(),
      contatos_end_bairro: Yup.string(),
      contatos_end_cep: Yup.string()
        .min(8, "CEP tem 8 caracteres")
        .max(8, "CEP tem 8 caracteres"),
      contatos_end_cidade: Yup.string(),
      contatos_buscar1_nome: Yup.string(),
      contatos_buscar1_parentesco: Yup.string(),
      contatos_buscar1_contato: Yup.string(),
      contatos_buscar2_nome: Yup.string(),
      contatos_buscar2_parentesco: Yup.string(),
      contatos_buscar2_contato: Yup.string(),
      contatos_buscar3_nome: Yup.string(),
      contatos_buscar3_parentesco: Yup.string(),
      contatos_buscar3_contato: Yup.string(),
      turma_id: Yup.number(),
      horaentrada_id: Yup.number(),
      horasaida_id: Yup.number(),
      periodo_id: Yup.number(),
      dados_escolares_data_pre_matricula: Yup.string(),
      dados_escolares_data_matricula: Yup.string(),
      dados_escolares_data_encerramento: Yup.string(),
      dados_escolares_observacoes: Yup.string(),
      anamnese_pediatra: Yup.string(),
      anamnese_contato_pediatra: Yup.string(),
      anamnese_alergias: Yup.string(),
      anamnese_medicacao: Yup.string(),
      anamnese_temperatura_banho: Yup.string(),
      anamnese_observacoes: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
