// import * as Yup from "yup";

import StoreUserService from "../services/UserService/StoreUserService";
import UpdateUserService from "../services/UserService/UpdateUserService";
import IndexUserService from "../services/UserService/IndexUserService";
import ShowUserService from "../services/UserService/ShowUserService";
import DeleteUserService from "../services/UserService/DeleteUserService";

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

      await DeleteUserService.run({ id });

      return res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await ShowUserService.run({ id });

      return res.json(user);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new UserController();
