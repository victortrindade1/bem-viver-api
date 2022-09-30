import { Op } from "sequelize";

import Horaentrada from "../models/Horaentrada";

class HoraentradaController {
  async store(req, res) {
    try {
      const horaentradaExists = await Horaentrada.findOne({
        where: { horaentrada: req.body.horaentrada },
      });

      if (horaentradaExists) {
        return res.status(400).json({ error: "Ano já existe." });
      }

      const { horaentrada } = req.body;

      const request = {
        horaentrada,
      };

      const { id } = await Horaentrada.create(request);

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

      const request = {
        id,
        horaentrada,
      };

      const horaentradaExists = await Horaentrada.findByPk(id);

      const horaentradaUpdated = await horaentradaExists.update(request);

      return res.json(horaentradaUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const where = {};

      if (nameFilter) {
        where.horaentrada =
          process.env.NODE_ENV === "test" // Somente PG suporta iLike
            ? { [Op.like]: `%${nameFilter}%` }
            : { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Horaentrada.count({ where });

      const horaentradas = await Horaentrada.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
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

      const horaentrada = await Horaentrada.findByPk(id);

      if (!horaentrada) {
        return res.status(400).json({ error: "Horaentrada não existe." });
      }

      await Horaentrada.destroy({ where: { id } });

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

      const horaentrada = await Horaentrada.findByPk(id, {});

      if (!horaentrada) {
        return res.status(400).json({ error: "Horaentrada não existe" });
      }

      return res.json(horaentrada);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new HoraentradaController();
