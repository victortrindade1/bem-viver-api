import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import Periodo from "../models/Periodo";

class PeriodoController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        periodo: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const periodoExists = await Periodo.findOne({
        where: { periodo: req.body.periodo },
      });

      if (periodoExists) {
        return res.status(400).json({ error: "Ano já existe." });
      }

      const { periodo } = req.body;

      const request = {
        periodo,
      };

      const { id } = await Periodo.create(request);

      return res.json({
        id,
        periodo,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        periodo: Yup.string().required(),
      });

      const { periodo } = req.body;
      const { id } = req.params;

      const request = {
        id,
        periodo,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const periodoExists = await Periodo.findByPk(id);

      const periodoUpdated = await periodoExists.update(request);

      return res.json(periodoUpdated);
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
        where.periodo = { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Periodo.count({ where });

      const periodos = await Periodo.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
      });

      return res.json({
        limit,
        page: Number(page),
        items: periodos,
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

      const periodo = await Periodo.findByPk(id);

      if (!periodo) {
        return res.status(400).json({ error: "Periodo não existe." });
      }

      await Periodo.destroy({ where: { id } });

      return res.status(200).json({ message: "Periodo excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const periodo = await Periodo.findByPk(id, {});

      if (!periodo) {
        return res.status(400).json({ error: "Periodo não existe" });
      }

      return res.json(periodo);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new PeriodoController();
