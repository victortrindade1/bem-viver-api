import User from "../../models/User";
import File from "../../models/File";

export default new (class ShowUserService {
  async run({ id }) {
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
      throw new Error("Usuário não existe.");
    }

    return user;
  }
})();
