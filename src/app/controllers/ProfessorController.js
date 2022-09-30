import StoreProfessorService from "../services/ProfessorService/StoreProfessorService";
import UpdateProfessorService from "../services/ProfessorService/UpdateProfessorService";
import IndexProfessorService from "../services/ProfessorService/IndexProfessorService";
import DeleteProfessorService from "../services/ProfessorService/DeleteProfessorService";
import ShowProfessorService from "../services/ProfessorService/ShowProfessorService";

class ProfessorController {
  async store(req, res) {
    try {
      const requestData = req.body;

      const newProfessor = await StoreProfessorService.run({
        requestData,
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

      await DeleteProfessorService.run({ id });

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

      const professor = await ShowProfessorService.run({ id });

      return res.json(professor);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new ProfessorController();
