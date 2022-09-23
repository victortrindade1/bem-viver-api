import Youch from "youch";
import { Op } from "sequelize";

import Ano from "../models/Ano";

class AnoController {
  async store(req, res) {
    try {
      const { ano, sistema_id } = req.body;

      const request = { ano, sistema_id };

      const anoExists = await Ano.findOne({
        where: sistema_id ? { ano, sistema_id } : { ano },
      });

      if (anoExists) {
        return res.status(400).json({ error: "Ano já existe." });
      }

      // const { ano, sistema_id } = req.body;

      // const request = {
      //   ano,
      //   sistema_id,
      // };

      const { id } = await Ano.create(request);

      return res.json({
        id,
        ano,
        sistema_id,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const { ano, sistema_id } = req.body;
      const { id } = req.params;

      const request = {
        id,
        ano,
        sistema_id,
      };

      const anoExists = await Ano.findByPk(id);

      const anoUpdated = await anoExists.update(request);

      return res.json(anoUpdated);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const where = {};

      if (nameFilter) {
        where.ano =
          process.env.NODE_ENV === "test" // Somente PG suporta iLike
            ? { [Op.like]: `%${nameFilter}%` }
            : { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Ano.count({ where });

      const anos = await Ano.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
      });

      return res.json({
        limit,
        page: Number(page),
        items: anos,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const ano = await Ano.findByPk(id);

      if (!ano) {
        return res.status(400).json({ error: "Ano não existe." });
      }

      await Ano.destroy({ where: { id } });

      return res.status(200).json({ message: "Ano excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const ano = await Ano.findByPk(id, {});

      if (!ano) {
        return res.status(400).json({ error: "Ano não existe" });
      }

      return res.json(ano);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new AnoController();
