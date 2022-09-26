import StoreAlunoService from "../services/AlunoService/StoreAlunoService";
import UpdateAlunoService from "../services/AlunoService/UpdateAlunoService";
import IndexAlunoService from "../services/AlunoService/IndexAlunoService";

import Aluno from "../models/Aluno";
import Turma from "../models/Turma";
import Periodo from "../models/Periodo";
import Turno from "../models/Turno";
import Horaentrada from "../models/Horaentrada";
import Horasaida from "../models/Horasaida";

class AlunoController {
  async store(req, res) {
    try {
      const {
        matricula,
        nome,
        dados_escolares_data_matricula,
        dados_escolares_data_pre_matricula,
        dados_pessoais_data_nascimento,
      } = req.body;

      const aluno = await StoreAlunoService.run({
        matricula,
        nome,
        dados_escolares_data_matricula,
        dados_escolares_data_pre_matricula,
        dados_pessoais_data_nascimento,
      });

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const requestData = req.body;

      const { id } = req.params;

      const alunoUpdated = await UpdateAlunoService.run({ id, requestData });

      return res.json(alunoUpdated);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: filter, limit = 5 } = req.query;

      const { total, alunos } = await IndexAlunoService.run({
        filter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: alunos,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
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
            include: [
              {
                model: Turno,
                as: "dados_escolares_turno",
              },
            ],
          },
          {
            model: Periodo,
            as: "dados_escolares_periodo",
          },
          // {
          //   model: Turno,
          //   as: "dados_escolares_turno",
          // },
          {
            model: Horaentrada,
            as: "dados_escolares_horaentrada",
          },
          {
            model: Horasaida,
            as: "dados_escolares_horasaida",
          },
        ],
      });

      if (!aluno) {
        return res.status(400).json({ error: "Aluno não existe." });
      }

      return res.json(aluno);
    } catch (err) {
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
      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new AlunoController();
