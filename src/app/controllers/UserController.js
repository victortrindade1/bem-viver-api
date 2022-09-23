// import * as Yup from "yup";
import Youch from "youch";

import User from "../models/User";
import File from "../models/File";

import StoreUserService from "../services/UserService/StoreUserService";
import UpdateUserService from "../services/UserService/UpdateUserService";
import IndexUserService from "../services/UserService/IndexUserService";

class UserController {
  async store(req, res) {
    try {
      const { name, email, password, isAdmin } = req.body;

      const id = await StoreUserService.run({
        name,
        email,
        password,
        isAdmin,
      });

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
    const { email, oldPassword, name, avatar_id } = req.body;
    const { id } = req.params;

    const userUpdated = await UpdateUserService.run({
      id,
      name,
      avatar_id,
      email,
      oldPassword,
    });

    return res.json(userUpdated);
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5 } = req.query;

      const { total, users } = await IndexUserService.run({
        nameFilter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: users,
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
