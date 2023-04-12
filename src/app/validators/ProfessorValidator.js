import * as Yup from "yup";

export const validateProfessorStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      professor_nome: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateProfessorUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      turmas: Yup.array().of(Yup.number()),
      materias: Yup.array().of(Yup.number()),
      professor_nome: Yup.string(),
      professor_cpf: Yup.string(),
      professor_rg: Yup.string(),
      professor_data_nascimento: Yup.string(),
      profissional_registro_cfep: Yup.string(),
      profissional_formacao_acad_1: Yup.string(),
      profissional_instituicao_1: Yup.string(),
      profissional_grau_formacao_1: Yup.string(),
      profissional_formacao_acad_2: Yup.string(),
      profissional_instituicao_2: Yup.string(),
      profissional_grau_formacao_2: Yup.string(),
      profissional_num_carteira_trabalho: Yup.string(),
      profissional_serie_carteira_trabalho: Yup.string(),
      profissional_nis_pis: Yup.string(),
      end_logradouro: Yup.string(),
      end_num: Yup.string(),
      end_complemento: Yup.string(),
      end_bairro: Yup.string(),
      end_cep: Yup.string(),
      end_cidade: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
