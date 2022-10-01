import StorePeriodoService from "../services/PeriodoService/StorePeriodoService";
import UpdatePeriodoService from "../services/PeriodoService/UpdatePeriodoService";
import IndexPeriodoService from "../services/PeriodoService/IndexPeriodoService";
import DeletePeriodoService from "../services/PeriodoService/DeletePeriodoService";
import ShowPeriodoService from "../services/PeriodoService/ShowPeriodoService";

class PeriodoController {
  async store(req, res) {
    try {
      const { periodo } = req.body;

      const id = await StorePeriodoService.run({ periodo });

      return res.json({
        id,
        periodo,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { periodo } = req.body;
      const { id } = req.params;

      const periodoUpdated = await UpdatePeriodoService.run({ id, periodo });

      return res.json(periodoUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { total, periodos } = await IndexPeriodoService.run({
        nameFilter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: periodos,
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

      await DeletePeriodoService.run({ id });

      return res.status(200).json({ message: "Periodo excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const periodo = await ShowPeriodoService.run({ id });

      return res.json(periodo);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new PeriodoController();
