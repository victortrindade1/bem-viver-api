import User from "../../models/User";

class StoreUserService {
  async run({ name, email, password, isAdmin }) {
    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      // return res.status(400).json({ error: "User already exists." });
      throw new Error("User already exists.");
    }

    // Em vez de carregar na response todos os dados de User, eu escolho carregar estes 4
    const { id } = await User.create({ name, email, password, isAdmin });

    return id;
  }
}

export default new StoreUserService();
