import StoreHoraentradaService from "../services/HoraentradaService/StoreHoraentradaService";
import UpdateHoraentradaService from "../services/HoraentradaService/UpdateHoraentradaService";
import IndexHoraentradaService from "../services/HoraentradaService/IndexHoraentradaService";
import DeleteHoraentradaService from "../services/HoraentradaService/DeleteHoraentradaService";
import ShowHoraentradaService from "../services/HoraentradaService/ShowHoraentradaService";

class HoraentradaController {
  async store(req, res) {
    try {
      const { horaentrada } = req.body;

      const id = await StoreHoraentradaService.run({ horaentrada });

      return res.json({
        id,
        horaentrada,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { horaentrada } = req.body;
      const { id } = req.params;

      const horaentradaUpdated = await UpdateHoraentradaService.run({
        id,
        horaentrada,
      });

      return res.json(horaentradaUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { total, horaentradas } = await IndexHoraentradaService.run({
        nameFilter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: horaentradas,
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

      await DeleteHoraentradaService.run({ id });

      return res
        .status(200)
        .json({ message: "Horaentrada excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const horaentrada = await ShowHoraentradaService.run({ id });

      return res.json(horaentrada);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new HoraentradaController();
