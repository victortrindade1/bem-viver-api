import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import Turma from "../models/Turma";
import Ano from "../models/Ano";

class TurmaController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        turma: Yup.string().required(),
        ano_id: Yup.number(),
      });

      const { turma, ano_id } = req.body;

      const request = {
        turma,
        ano_id,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const verifyExists = await Turma.findOne({
        where: ano_id
          ? {
              turma,
              ano_id,
            }
          : {
              turma,
            },
      });

      if (verifyExists) {
        return res.status(400).json({ error: "Turma já existe." });
      }

      const { id } = await Turma.create(request);

      return res.json({
        id,
        turma,
        ano_id,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        turma: Yup.string(),
        ano_id: Yup.number(),
      });

      const { turma, ano_id } = req.body;
      const { id } = req.params;

      const request = {
        id,
        turma,
        ano_id,
      };

      if (!(await schema.isValid(request))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const turmaExists = await Turma.findByPk(id);

      const response = await turmaExists.update(request);

      return res.json(response);
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
      const { page = 1, q: filter, limit = 5 } = req.query;

      const where = {};

      if (filter) {
        where.turma = { [Op.iLike]: `${filter}%` };
      }

      const total = await Turma.count({ where });

      const turmas = await Turma.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
        // attributes: ["id", "label", "created_at", "updated_at"],
        include: [
          {
            model: Ano,
            as: "dados_escolares_ano",
            // attributes: ["name", "path", "url"],
          },
        ],
      });

      return res.json({
        limit,
        page: Number(page),
        items: turmas,
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

      const turma = await Turma.findByPk(id);

      if (!turma) {
        return res.status(400).json({ error: "Turma não existe." });
      }

      await Turma.destroy({ where: { id } });

      return res.status(200).json({ message: "Turma excluída com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const turma = await Turma.findByPk(id, {
        include: [
          {
            model: Ano,
            as: "dados_escolares_ano",
            // attributes: ["name", "path", "url"],
          },
        ],
      });

      if (!turma) {
        return res.status(400).json({ error: "Turma não existe" });
      }

      return res.json(turma);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new TurmaController();
