import * as Yup from "yup";
import Youch from "youch";
import { Op } from "sequelize";

import User from "../models/User";
import File from "../models/File";

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }

      const request = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      };

      // Em vez de carregar na response todos os dados de User, eu escolho carregar estes 4
      const { id, name, email, isAdmin } = await User.create(request);

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
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        // Condicional: Se for passado um oldPassword, então o campo password é
        // obrigatório
        password: Yup.string()
          .min(6)
          .when("oldPassword", (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when("password", (password, field) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
        ),
      });

      const { name, email, oldPassword, password, confirmPassword } = req.body;
      const { id } = req.params;

      const userRequest = {
        id,
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      };

      if (!(await schema.isValid(userRequest))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const user = await User.findByPk(id);

      if (email !== user.email) {
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
        where.name = { [Op.iLike]: `${nameFilter}%` };
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
