import { Op } from "sequelize";

import Materia from "../models/Materia";

class MateriaController {
  async store(req, res) {
    try {
      const { materia } = req.body;

      const materiaExists = await Materia.findOne({
        where: { materia },
      });

      if (materiaExists) {
        return res.status(400).json({ error: "Matéria já existe." });
      }

      const request = {
        materia,
      };

      const { id } = await Materia.create(request);

      return res.json({
        id,
        materia,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const { materia } = req.body;
      const { id } = req.params;

      const request = {
        id,
        materia,
      };

      const materiaExists = await Materia.findByPk(id);

      const materiaUpdated = await materiaExists.update(request);

      return res.json(materiaUpdated);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const where = {};

      if (nameFilter) {
        where.materia =
          process.env.NODE_ENV === "test" // Somente PG suporta iLike
            ? { [Op.like]: `%${nameFilter}%` }
            : { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await Materia.count({ where });

      const materias = await Materia.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
      });

      return res.json({
        limit,
        page: Number(page),
        items: materias,
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

      const materia = await Materia.findByPk(id);

      if (!materia) {
        return res.status(400).json({ error: "Matéria não existe." });
      }

      await Materia.destroy({ where: { id } });

      return res.status(200).json({ message: "Matéria excluída com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const materia = await Materia.findByPk(id, {});

      if (!materia) {
        return res.status(400).json({ error: "Matéria não existe." });
      }

      return res.json(materia);
    } catch (err) {
      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new MateriaController();
