import User from "../../models/User";

class UpdateUserService {
  async run({ id, email, oldPassword, name, avatar_id, password }) {
    if (password && !oldPassword) {
      throw new Error("Password does not match");
    }

    const user = await User.findByPk(id);

    // Se tiver enviado e-mail, verifica se já existe algum igual
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        throw new Error("User already exists.");
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new Error("Password does not match");
    }

    const request = {
      name,
      email,
      avatar_id,
      password,
    };

    const userUpdated = await user.update(request);

    return userUpdated;
  }
}

export default new UpdateUserService();
