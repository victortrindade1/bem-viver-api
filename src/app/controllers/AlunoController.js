import Youch from "youch";

import Aluno from "../models/Aluno";
import Turma from "../models/Turma";
import Ano from "../models/Ano";
import Sistema from "../models/Sistema";
import Periodo from "../models/Periodo";
import Turno from "../models/Turno";
import Horaentrada from "../models/Horaentrada";
import Horasaida from "../models/Horasaida";

import { whereFilter } from "../../utils";
import statusPagamento from "../../lib/constants";

class AlunoController {
  async store(req, res) {
    try {
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
        // 5 = Pré Matr.
        // 1 = Sem Pgto
        statuspagamento:
          req.body.dataPreMatricula && !req.body.dataMatricula
            ? statusPagamento[5].status
            : statusPagamento[1].status,
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
      const request = {
        ...req.body,
        id: req.params.id,
      };

      const aluno = await Aluno.findByPk(request.id);

      const {
        ativo,
        nome,
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
        dados_escolares_sistema,
        turma_id,
        turno_id,
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
      } = req.body;

      const alunoUpdated = await aluno.update({
        ativo,
        nome,
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
        dados_escolares_sistema,
        turma_id,
        turno_id,
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
      });

      return res.json(alunoUpdated);
    } catch (err) {
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
          field: "sistema",
          model: Sistema,
          as: "dados_escolares_sistema",
          at: {
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
        },
        {
          queryId: 4,
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
          queryId: 5,
          field: "turma",
          model: Turma,
          as: "dados_escolares_turma",
          at: {
            model: Aluno,
          },
        },
        {
          queryId: 6,
          field: "statuspagamento",
          model: Aluno,
        },
        // {
        //   queryId: 6,
        //   field: "statuspagamento",
        //   model: Statuspagamento,
        //   as: "dados_escolares_statuspagamento",
        //   at: {
        //     model: Aluno,
        //   },
        // },
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
            queryWhere.queryId === 6) &&
          queryWhere.where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
        include: [
          {
            model: Turma,
            as: "dados_escolares_turma",
            required: !!(
              queryWhere.queryId === 3 ||
              queryWhere.queryId === 4 ||
              queryWhere.queryId === 5
            ),
            where: queryWhere.queryId === 5 && queryWhere.where,
            include: [
              {
                model: Ano,
                as: "dados_escolares_ano",
                required: !!(
                  queryWhere.queryId === 3 || queryWhere.queryId === 4
                ),
                where: queryWhere.queryId === 4 && queryWhere.where,
                include: [
                  {
                    model: Sistema,
                    as: "dados_escolares_sistema",
                    required: true,
                    where: queryWhere.queryId === 3 && queryWhere.where,
                  },
                ],
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
          },
          {
            model: Periodo,
            as: "dados_escolares_periodo",
          },
          {
            model: Turno,
            as: "dados_escolares_turno",
          },
          {
            model: Horaentrada,
            as: "dados_escolares_horaentrada",
          },
          {
            model: Horasaida,
            as: "dados_escolares_horasaida",
          },
          // {
          //   model: Statuspagamento,
          //   as: "dados_escolares_turma",
          // },
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
