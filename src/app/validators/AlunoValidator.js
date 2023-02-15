import * as Yup from "yup";
import { dateFormat, cepFormat } from "../../utils";
import statusPagamento from "../../lib/constants";

export const validateAlunoStore = async (req, res, next) => {
  try {
    // const schema = Yup.object().shape({
    //   nome: Yup.string().required(),
    //   dados_pessoais_data_nascimento: Yup.string().required(),
    //   matricula: Yup.string().required(),
    //   dados_escolares_data_matricula: Yup.string().when(
    //     "dados_escolares_data_pre_matricula",
    //     (dados_escolares_data_pre_matricula, field) =>
    //       dados_escolares_data_pre_matricula ? field : field.required()
    //   ),
    //   dados_escolares_data_pre_matricula: Yup.string(),
    // });

    const schema = Yup.object().shape({
      nome: Yup.string().required("Campo obrigatório"),
      idade: Yup.number(),
      dados_pessoais_data_nascimento: Yup.string().matches(
        dateFormat,
        "Data incorreta"
      ),
      matricula: Yup.string().required("Campo obrigatório"),
      dados_escolares_data_matricula: Yup.string()
        .when("dados_escolares_data_pre_matricula", (otherField, field) =>
          otherField
            ? field // Aceita string vazia ou date
                .nullable()
                .transform((curr, orig) => (orig === "" ? null : curr))
            : field.required("Campo obrigatório")
        )
        .matches(dateFormat, "Data incorreta"),
      dados_escolares_data_pre_matricula: Yup.string()
        // Aceita string vazia ou date
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(dateFormat, "Data incorreta"),
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
      matricula: Yup.string(),
      nome: Yup.string(),
      idade: Yup.number(),
      statuspagamento: Yup.string().oneOf(
        statusPagamento.map((item) => item.status)
      ),
      dados_pessoais_rg: Yup.string(),
      dados_pessoais_cpf: Yup.string()
        .min(14, "CPF precisa ter 14 caracteres")
        .max(14, "CPF precisa ter 14 caracteres"),
      dados_pessoais_data_nascimento: Yup.string(),
      dados_pessoais_num_certidao: Yup.string(),
      dados_pessoais_folha_certidao: Yup.string(),
      dados_pessoais_livro_certidao: Yup.string(),
      contatos_pai_nome: Yup.string(),
      contatos_pai_rg: Yup.string(),
      contatos_pai_cpf: Yup.string()
        .min(14, "CPF precisa ter 14 caracteres")
        .max(14, "CPF precisa ter 14 caracteres"),
      contatos_pai_cnpj: Yup.string()
        .min(18, "CNPJ precisa ter 18 caracteres")
        .max(18, "CNPJ precisa ter 18 caracteres"),
      contatos_pai_data_nascimento: Yup.string(),
      contatos_pai_tel: Yup.string(),
      contatos_pai_cel: Yup.string(),
      contatos_pai_email: Yup.string().email(),
      contatos_mae_nome: Yup.string(),
      contatos_mae_rg: Yup.string(),
      contatos_mae_cpf: Yup.string()
        .min(14, "CPF precisa ter 14 caracteres")
        .max(14, "CPF precisa ter 14 caracteres"),
      contatos_mae_cnpj: Yup.string()
        .min(18, "CNPJ precisa ter 18 caracteres")
        .max(18, "CNPJ precisa ter 18 caracteres"),
      contatos_mae_data_nascimento: Yup.string(),
      contatos_mae_tel: Yup.string(),
      contatos_mae_cel: Yup.string(),
      contatos_mae_email: Yup.string().email(),
      contatos_resp_nome: Yup.string(),
      contatos_resp_rg: Yup.string(),
      contatos_resp_cpf: Yup.string()
        .min(14, "CPF precisa ter 14 caracteres")
        .max(14, "CPF precisa ter 14 caracteres"),
      contatos_resp_cnpj: Yup.string()
        .min(18, "CNPJ precisa ter 18 caracteres")
        .max(18, "CNPJ precisa ter 18 caracteres"),
      contatos_resp_tel: Yup.string(),
      contatos_resp_cel: Yup.string(),
      contatos_resp_email: Yup.string().email(),
      contatos_end_logradouro: Yup.string(),
      contatos_end_num: Yup.string(),
      contatos_end_complemento: Yup.string(),
      contatos_end_bairro: Yup.string(),
      contatos_end_cep: Yup.string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(cepFormat, "Cep incorreto"),
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
