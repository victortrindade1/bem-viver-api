// import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import User from "../models/User";
import File from "../models/File";

class UserController {
  async store(req, res) {
    try {
      const { name, email, password, isAdmin } = req.body;

      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }

      // Em vez de carregar na response todos os dados de User, eu escolho carregar estes 4
      const { id } = await User.create({ name, email, password, isAdmin });

      return res.json({
        id,
        name,
        email,
        isAdmin,
      });
    } catch (error) {
      return res.status(400).json({ error: "Error in database" });
    }
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);

    // Se tiver enviado e-mail, verifica se já existe algum igual
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const request = {
      name: req.body.name,
      email: req.body.email,
      avatar_id: req.body.avatar_id,
    };

    const userUpdated = await user.update(request);

    return res.json(userUpdated);
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const where = {};

      if (nameFilter) {
        where.name =
          process.env.NODE_ENV === "test" // Somente PG suporta iLike
            ? { [Op.like]: `%${nameFilter}%` }
            : { [Op.iLike]: `%${nameFilter}%` };
      }

      const total = await User.count({ where });

      const users = await User.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "name",
          "email",
          "is_admin",
          "created_at",
          "updated_at",
        ],
        include: [
          {
            model: File,
            as: "avatar",
            atributes: ["id", "name", "path", "url"],
          },
        ],
      });

      return res.json({
        limit,
        page: Number(page),
        items: users,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
      ) {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({ error: "User does not exist." });
      }

      await User.destroy({ where: { id } });

      return res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: [
          {
            model: File,
            as: "avatar",
            attributes: ["name", "path", "url"],
          },
        ],
      });

      if (!user) {
        return res.status(400).json({ error: "User does not exists" });
      }

      return res.json(user);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();

        return res.status(400).json(errors);
      }

      return res.status(400).json({ error: "Error in database" });
    }
  }
}

export default new UserController();
