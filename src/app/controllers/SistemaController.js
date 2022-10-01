import StoreSistemaService from "../services/SistemaService/StoreSistemaService";
import UpdateSistemaService from "../services/SistemaService/UpdateSistemaService";
import IndexSistemaService from "../services/SistemaService/IndexSistemaService";
import DeleteSistemaService from "../services/SistemaService/DeleteSistemaService";
import ShowSistemaService from "../services/SistemaService/ShowSistemaService";

class SistemaController {
  async store(req, res) {
    try {
      const { sistema } = req.body;

      const id = await StoreSistemaService.run({ sistema });

      return res.json({
        id,
        sistema,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { sistema } = req.body;
      const { id } = req.params;

      const sistemaUpdated = await UpdateSistemaService.run({ id, sistema });

      return res.json(sistemaUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { total, sistemas } = await IndexSistemaService.run({
        nameFilter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: sistemas,
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

      await DeleteSistemaService.run({ id });

      return res.status(200).json({ message: "Sistema excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const sistema = await ShowSistemaService.run({ id });

      return res.json(sistema);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new SistemaController();
