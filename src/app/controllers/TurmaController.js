import IndexTurmaService from "../services/TurmaService/IndexTurmaService";
import StoreTurmaService from "../services/TurmaService/StoreTurmaService";
import UpdateTurmaService from "../services/TurmaService/UpdateTurmaService";
import DeleteTurmaService from "../services/TurmaService/DeleteTurmaService";
import ShowTurmaService from "../services/TurmaService/ShowTurmaService";

class TurmaController {
  async store(req, res) {
    try {
      const { turma, ano_id, turno_id, professores, materias } = req.body;

      const newTurma = await StoreTurmaService.run({
        turma,
        ano_id,
        turno_id,
        professores,
        materias,
      });

      return res.json(newTurma);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { turma, ano_id, turno_id, professores, materias } = req.body;
      const { id } = req.params;

      const response = await UpdateTurmaService.run({
        id,
        turma,
        ano_id,
        turno_id,
        professores,
        materias,
      });

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: err.message });
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

      await DeleteTurmaService.run({ id });

      return res.status(200).json({ message: "Turma excluída com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const turma = await ShowTurmaService.run({ id });

      return res.json(turma);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new TurmaController();
