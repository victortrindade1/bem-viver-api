import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import HoraEntrada from "../models/HoraEntrada";

class HoraEntradaController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        horaentrada: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const horaentradaExists = await HoraEntrada.findOne({
        where: { horaentrada: req.body.horaentrada },
      });

      if (horaentradaExists) {
        return res.status(400).json({ error: "Ano já existe." });
      }

      const { horaentrada } = req.body;

      const request = {
        horaentrada,
      };

      const { id } = await HoraEntrada.create(request);

      return res.json({
        id,
        horaentrada,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        horaentrada: Yup.string().required(),
      });

      const { horaentrada } = req.body;
      const { id } = req.params;

      const request = {
        id,
        horaentrada,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const horaentradaExists = await HoraEntrada.findByPk(id);

      const horaentradaUpdated = await horaentradaExists.update(request);

      return res.json(horaentradaUpdated);
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
        where.horaentrada = { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await HoraEntrada.count({ where });

      const horaentradas = await HoraEntrada.findAll({
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

      const horaentrada = await HoraEntrada.findByPk(id);

      if (!horaentrada) {
        return res.status(400).json({ error: "HoraEntrada não existe." });
      }

      await HoraEntrada.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: "HoraEntrada excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const horaentrada = await HoraEntrada.findByPk(id, {});

      if (!horaentrada) {
        return res.status(400).json({ error: "HoraEntrada não existe" });
      }

      return res.json(horaentrada);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new HoraEntradaController();
