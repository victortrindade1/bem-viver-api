import * as Yup from "yup";
// import Youch from "youch";
import { Op } from "sequelize";

import Turno from "../models/Turno";

class TurnoController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        turno: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const turnoExists = await Turno.findOne({
        where: { turno: req.body.turno },
      });

      if (turnoExists) {
        return res.status(400).json({ error: "Turno já existe." });
      }

      const { turno } = req.body;

      const request = {
        turno,
      };

      const { id } = await Turno.create(request);

      return res.json({
        id,
        turno,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        turno: Yup.string().required(),
      });

      const { turno } = req.body;
      const { id } = req.params;

      const request = {
        id,
        turno,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const turnoExists = await Turno.findByPk(id);

      const turnoUpdated = await turnoExists.update(request);

      return res.json(turnoUpdated);
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const where = {};

      if (nameFilter) {
        where.turno =
          process.env.NODE_ENV === "test" // Somente PG suporta iLike
            ? { [Op.like]: `%${nameFilter}%` }
            : { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Turno.count({ where });

      const turnos = await Turno.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
      });

      return res.json({
        limit,
        page: Number(page),
        items: turnos,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const turno = await Turno.findByPk(id);

      if (!turno) {
        return res.status(400).json({ error: "Turno não existe." });
      }

      await Turno.destroy({ where: { id } });

      return res.status(200).json({ message: "Turno excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const turno = await Turno.findByPk(id, {});

      if (!turno) {
        return res.status(400).json({ error: "Turno não existe" });
      }

      return res.json(turno);
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new TurnoController();
