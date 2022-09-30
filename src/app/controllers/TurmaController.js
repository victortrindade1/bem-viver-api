import IndexTurmaService from "../services/TurmaService/IndexTurmaService";
import StoreTurmaService from "../services/TurmaService/StoreTurmaService";
import UpdateTurmaService from "../services/TurmaService/UpdateTurmaService";

import Turma from "../models/Turma";
import Ano from "../models/Ano";
import Turno from "../models/Turno";
import Professor from "../models/Professor";

class TurmaController {
  async store(req, res) {
    try {
      const { turma, ano_id, turno_id, professores } = req.body;

      const newTurma = await StoreTurmaService.run({
        turma,
        ano_id,
        turno_id,
        professores,
      });

      return res.json(newTurma);
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const { turma, ano_id, turno_id, professores } = req.body;
      const { id } = req.params;

      const response = await UpdateTurmaService.run({
        id,
        turma,
        ano_id,
        turno_id,
        professores,
      });

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: filter, limit = 5 } = req.query;

      const { turmas, total } = await IndexTurmaService.run({
        filter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: turmas,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const turma = await Turma.findByPk(id);

      if (!turma) {
        return res.status(400).json({ error: "Turma não existe." });
      }

      await Turma.destroy({ where: { id } });

      return res.status(200).json({ message: "Turma excluída com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const turma = await Turma.findByPk(id, {
        include: [
          {
            model: Ano,
            as: "dados_escolares_ano",
            // attributes: ["name", "path", "url"],
          },
          {
            model: Turno,
            as: "dados_escolares_turno",
            // attributes: ["name", "path", "url"],
          },
          {
            model: Professor,
            as: "professores",
            through: { attributes: [] }, // hide join relation
          },
        ],
      });

      if (!turma) {
        return res.status(400).json({ error: "Turma não existe" });
      }

      return res.json(turma);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new TurmaController();
