import Professor from "../models/Professor";
import Turma from "../models/Turma";

import StoreProfessorService from "../services/ProfessorService/StoreProfessorService";
import UpdateProfessorService from "../services/ProfessorService/UpdateProfessorService";
import IndexProfessorService from "../services/ProfessorService/IndexProfessorService";

class ProfessorController {
  async store(req, res) {
    try {
      const {
        turmas,
        professor_nome,
        professor_cpf,
        professor_rg,
        professor_data_nascimento,
        profissional_registro_cfep,
        profissional_formacao_acad_1,
        profissional_instituicao_1,
        profissional_grau_formacao_1,
        profissional_formacao_acad_2,
        profissional_instituicao_2,
        profissional_grau_formacao_2,
        profissional_num_carteira_trabalho,
        profissional_serie_carteira_trabalho,
        profissional_nis_pis,
        end_logradouro,
        end_num,
        end_complemento,
        end_bairro,
        end_cep,
        end_cidade,
      } = req.body;

      const newProfessor = await StoreProfessorService.run({
        turmas,
        professor_nome,
        professor_cpf,
        professor_rg,
        professor_data_nascimento,
        profissional_registro_cfep,
        profissional_formacao_acad_1,
        profissional_instituicao_1,
        profissional_grau_formacao_1,
        profissional_formacao_acad_2,
        profissional_instituicao_2,
        profissional_grau_formacao_2,
        profissional_num_carteira_trabalho,
        profissional_serie_carteira_trabalho,
        profissional_nis_pis,
        end_logradouro,
        end_num,
        end_complemento,
        end_bairro,
        end_cep,
        end_cidade,
      });

      return res.json(newProfessor);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const requestData = req.body;

      const professorUpdated = await UpdateProfessorService.run({
        id,
        requestData,
      });

      return res.json(professorUpdated);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: filter, limit = 5 } = req.query;

      const { total, professores } = await IndexProfessorService.run({
        filter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: professores,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const professor = await Professor.findByPk(id);

      if (!professor) {
        return res.status(400).json({ error: "Professor não existe." });
      }

      await Professor.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: "Professor excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const professor = await Professor.findByPk(id, {
        include: [
          {
            model: Turma,
            as: "turmas",
            through: { attributes: [] }, // hide join relation
          },
        ],
      });

      if (!professor) {
        return res.status(400).json({ error: "Professor não existe" });
      }

      return res.json(professor);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new ProfessorController();
