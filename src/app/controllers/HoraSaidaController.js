import StoreHorasaidaService from "../services/HorasaidaService/StoreHorasaidaService";
import UpdateHorasaidaService from "../services/HorasaidaService/UpdateHorasaidaService";
import IndexHorasaidaService from "../services/HorasaidaService/IndexHorasaidaService";
import DeleteHorasaidaService from "../services/HorasaidaService/DeleteHorasaidaService";
import ShowHorasaidaService from "../services/HorasaidaService/ShowHorasaidaService";

class HorasaidaController {
  async store(req, res) {
    try {
      const { horasaida } = req.body;

      const id = await StoreHorasaidaService.run({ horasaida });

      return res.json({
        id,
        horasaida,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { horasaida } = req.body;
      const { id } = req.params;

      const horasaidaUpdated = await UpdateHorasaidaService.run({
        id,
        horasaida,
      });

      return res.json(horasaidaUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { total, horasaidas } = await IndexHorasaidaService.run({
        nameFilter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: horasaidas,
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

      await DeleteHorasaidaService.run({ id });

      return res
        .status(200)
        .json({ message: "Horasaida excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const horasaida = await ShowHorasaidaService.run({ id });

      return res.json(horasaida);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new HorasaidaController();
