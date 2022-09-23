import { Op } from "sequelize";

import Sistema from "../models/Sistema";

class SistemaController {
  async store(req, res) {
    try {
      const sistemaExists = await Sistema.findOne({
        where: { sistema: req.body.sistema },
      });

      if (sistemaExists) {
        return res.status(400).json({ error: "Sistema já existe." });
      }

      const { sistema } = req.body;

      const request = {
        sistema,
      };

      const { id } = await Sistema.create(request);

      return res.json({
        id,
        sistema,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const { sistema } = req.body;
      const { id } = req.params;

      const request = {
        id,
        sistema,
      };

      const sistemaExists = await Sistema.findByPk(id);

      const sistemaUpdated = await sistemaExists.update(request);

      return res.json(sistemaUpdated);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const where = {};

      if (nameFilter) {
        where.sistema =
          process.env.NODE_ENV === "test" // Somente PG suporta iLike
            ? { [Op.like]: `%${nameFilter}%` }
            : { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Sistema.count({ where });

      const sistemas = await Sistema.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
      });

      return res.json({
        limit,
        page: Number(page),
        items: sistemas,
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

      const sistema = await Sistema.findByPk(id);

      if (!sistema) {
        return res.status(400).json({ error: "Sistema não existe." });
      }

      await Sistema.destroy({ where: { id } });

      return res.status(200).json({ message: "Sistema excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const sistema = await Sistema.findByPk(id, {});

      if (!sistema) {
        return res.status(400).json({ error: "Sistema não existe" });
      }

      return res.json(sistema);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new SistemaController();
