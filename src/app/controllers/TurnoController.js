import StoreTurnoService from "../services/TurnoService/StoreTurnoService";
import UpdateTurnoService from "../services/TurnoService/UpdateTurnoService";
import IndexTurnoService from "../services/TurnoService/IndexTurnoService";
import DeleteTurnoService from "../services/TurnoService/DeleteTurnoService";
import ShowTurnoService from "../services/TurnoService/ShowTurnoService";

class TurnoController {
  async store(req, res) {
    try {
      const { turno } = req.body;

      const id = await StoreTurnoService.run({
        turno,
      });

      return res.json({
        id,
        turno,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const { turno } = req.body;
      const { id } = req.params;

      const turnoUpdated = await UpdateTurnoService.run({
        id,
        turno,
      });

      return res.json(turnoUpdated);
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { turnos, total } = await IndexTurnoService.run({
        nameFilter,
        page,
        limit,
      });

      return res.json({
        limit,
        page: Number(page),
        items: turnos,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await DeleteTurnoService.run({ id });

      return res.status(200).json({ message: "Turno excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const turno = await ShowTurnoService.run({ id });

      return res.json(turno);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default new TurnoController();
