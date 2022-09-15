import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import Horasaida from "../models/Horasaida";

class HorasaidaController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        horasaida: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const horasaidaExists = await Horasaida.findOne({
        where: { horasaida: req.body.horasaida },
      });

      if (horasaidaExists) {
        return res.status(400).json({ error: "Ano já existe." });
      }

      const { horasaida } = req.body;

      const request = {
        horasaida,
      };

      const { id } = await Horasaida.create(request);

      return res.json({
        id,
        horasaida,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        horasaida: Yup.string().required(),
      });

      const { horasaida } = req.body;
      const { id } = req.params;

      const request = {
        id,
        horasaida,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const horasaidaExists = await Horasaida.findByPk(id);

      const horasaidaUpdated = await horasaidaExists.update(request);

      return res.json(horasaidaUpdated);
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
        where.horasaida = { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Horasaida.count({ where });

      const horasaidas = await Horasaida.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
      });

      return res.json({
        limit,
        page: Number(page),
        items: horasaidas,
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

      const horasaida = await Horasaida.findByPk(id);

      if (!horasaida) {
        return res.status(400).json({ error: "Horasaida não existe." });
      }

      await Horasaida.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: "Horasaida excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const horasaida = await Horasaida.findByPk(id, {});

      if (!horasaida) {
        return res.status(400).json({ error: "Horasaida não existe" });
      }

      return res.json(horasaida);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new HorasaidaController();
