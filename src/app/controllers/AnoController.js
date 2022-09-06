import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import Ano from "../models/Ano";

class AnoController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        ano: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const anoExists = await Ano.findOne({
        where: { ano: req.body.ano },
      });

      if (anoExists) {
        return res.status(400).json({ error: "Ano já existe." });
      }

      const { ano } = req.body;

      const request = {
        ano,
      };

      const { id } = await Ano.create(request);

      return res.json({
        id,
        ano,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        ano: Yup.string().required(),
      });

      const { ano } = req.body;
      const { id } = req.params;

      const request = {
        id,
        ano,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

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
        where.ano = { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Ano.count({ where });

      const anos = await Ano.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
        // attributes: ["id", "label", "created_at", "updated_at"],
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
