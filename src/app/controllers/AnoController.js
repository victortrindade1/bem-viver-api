import StoreAnoService from "../services/AnoService/StoreAnoService";
import UpdateAnoService from "../services/AnoService/UpdateAnoService";
import IndexAnoService from "../services/AnoService/IndexAnoService";
import DeleteAnoService from "../services/AnoService/DeleteAnoService";
import ShowAnoService from "../services/AnoService/ShowAnoService";

class AnoController {
  async store(req, res) {
    try {
      const { ano, sistema_id } = req.body;

      const id = await StoreAnoService.run({ ano, sistema_id });

      return res.json({
        id,
        ano,
        sistema_id,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { ano, sistema_id } = req.body;
      const { id } = req.params;

      const anoUpdated = await UpdateAnoService.run({ id, ano, sistema_id });

      return res.json(anoUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { anos, total } = await IndexAnoService.run({
        nameFilter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: anos,
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

      await DeleteAnoService.run({ id });

      return res.status(200).json({ message: "Ano excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const ano = await ShowAnoService.run({ id });

      return res.json(ano);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new AnoController();
