import Youch from "youch";
import * as Yup from "yup";
// import { literal } from "sequelize";

import Aluno from "../models/Aluno";
import Turma from "../models/Turma";
import Ano from "../models/Ano";

import { whereFilter } from "../../Utils";

class AlunoController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        matricula: Yup.number().required(),
        // status: Yup.string().required(),
        dataMatricula: Yup.string().when(
          "dataPreMatricula",
          (dataPreMatricula, field) =>
            dataPreMatricula ? field : field.required()
        ),
        dataPreMatricula: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const alunoExists = await Aluno.findOne({
        where: { matricula: req.body.matricula },
      });

      if (alunoExists) {
        return res.status(400).json({ error: "Matrícula já existe." });
      }

      // const { nome, matricula, dataMatricula, dataPreMatricula } = req.body;

      const alunoRequest = {
        nome: req.body.nome,
        matricula: req.body.matricula,
        dataMatricula: req.body.dataMatricula,
        dataPreMatricula: req.body.dataPreMatricula,
        ativo: true,
        status: "Sem Pgto",
      };

      const aluno = await Aluno.create(alunoRequest);

      return res.json(aluno);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        ativo: Yup.boolean(),
        matricula: Yup.number(),
        nome: Yup.string(),
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
        dados_escolares_sistema: Yup.string(),
        turma_id: Yup.number(),
        dados_escolares_turno: Yup.string(),
        dados_escolares_horario_entrada: Yup.string(),
        dados_escolares_horario_saida: Yup.string(),
        // ano_id: Yup.number(),
        dados_escolares_periodo: Yup.string(),
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

      const request = {
        ...req.body,
        id: req.params.id,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const aluno = await Aluno.findByPk(request.id);

      const {
        ativo,
        nome,
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
        dados_escolares_sistema,
        turma_id,
        dados_escolares_turno,
        dados_escolares_horario_entrada,
        dados_escolares_horario_saida,
        // ano_id,
        dados_escolares_periodo,
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
      } = req.body;

      const alunoUpdated = await aluno.update({
        ativo,
        nome,
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
        dados_escolares_sistema,
        turma_id,
        dados_escolares_turno,
        dados_escolares_horario_entrada,
        dados_escolares_horario_saida,
        // ano_id,
        dados_escolares_periodo,
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

      return res.json(alunoUpdated);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: filter, limit = 5 } = req.query;

      let queryWhere = {};

      const queryFields = [
        {
          queryId: 1,
          field: "nome",
          model: Aluno,
        },
        {
          queryId: 2,
          field: "matricula",
          model: Aluno,
        },
        {
          queryId: 3,
          field: "ano",
          model: Ano,
          as: "dados_escolares_ano",
          at: {
            model: Turma,
            as: "dados_escolares_turma",
            at: {
              model: Aluno,
            },
          },
        },
        {
          queryId: 4,
          field: "turma",
          model: Turma,
          as: "dados_escolares_turma",
          at: {
            model: Aluno,
          },
        },
        {
          queryId: 5,
          field: "status",
          model: Aluno,
        },
      ];

      if (filter) {
        queryWhere = await whereFilter({
          filter,
          queryFields,
        });
      }

      const alunos = await Aluno.findAndCountAll({
        distinct: true,
        where:
          (queryWhere.queryId === 1 ||
            queryWhere.queryId === 2 ||
            queryWhere.queryId === 5) &&
          queryWhere.where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
        include: [
          {
            model: Turma,
            as: "dados_escolares_turma",
            required: true,
            where: queryWhere.queryId === 4 && queryWhere.where,
            include: [
              {
                model: Ano,
                as: "dados_escolares_ano",
                required: true,
                where: queryWhere.queryId === 3 && queryWhere.where,
              },
            ],
          },
        ],
      });

      const total = alunos.count;

      return res.json({
        limit,
        page: Number(page),
        items: alunos.rows,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id, {
        include: [
          {
            model: Turma,
            as: "dados_escolares_turma",
            // attributes: ["name", "path", "url"],
          },
        ],
      });

      if (!aluno) {
        return res.status(400).json({ error: "Aluno não existe." });
      }

      return res.json(aluno);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ error: "Aluno não existe." });
      }

      await Aluno.destroy({ where: { id } });

      return res.status(200).json({ message: "Aluno excluído com sucesso." });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new AlunoController();
