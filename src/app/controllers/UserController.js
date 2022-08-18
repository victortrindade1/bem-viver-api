import User from "../models/User";

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Em vez de carregar na response todos os dados de User, eu escolho carregar estes 4
    const { id, name, email, isAdmin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      isAdmin,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, name, isAdmin } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      isAdmin,
    });
  }
}

export default new UserController();
