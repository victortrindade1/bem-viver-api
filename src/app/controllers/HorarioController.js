import IndexHorarioService from "../services/HorarioService/IndexHorarioService";
import StoreHorarioService from "../services/HorarioService/StoreHorarioService";
import UpdateHorarioService from "../services/HorarioService/UpdateHorarioService";
import DeleteHorarioService from "../services/HorarioService/DeleteHorarioService";
import ShowHorarioService from "../services/HorarioService/ShowHorarioService";

class HorarioController {
  async store(req, res) {
    try {
      const { diahora, professor_id, materia_id, turma_id } = req.body;

      const newHorario = await StoreHorarioService.run({
        diahora,
        professor_id,
        materia_id,
        turma_id,
      });

      return res.json(newHorario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { diahora, professor_id, materia_id, turma_id } = req.body;

      const { id } = req.params;

      const response = await UpdateHorarioService.run({
        id,
        diahora,
        professor_id,
        materia_id,
        turma_id,
      });

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: filter, limit = 5 } = req.query;

      const { horarios, total } = await IndexHorarioService.run({
        filter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: horarios,
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

      await DeleteHorarioService.run({ id });

      return res.status(200).json({ message: "Horário excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const horario = await ShowHorarioService.run({ id });

      return res.json(horario);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new HorarioController();
