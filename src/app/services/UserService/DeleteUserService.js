import User from "../../models/User";

class DeleteUserService {
  async run({ id }) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário não existe.");
    }

    await User.destroy({ where: { id } });
  }
}

export default new DeleteUserService();
