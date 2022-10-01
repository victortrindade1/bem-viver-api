import User from "../../models/User";
import File from "../../models/File";

export default new (class StoreSessionService {
  async run({ email, password }) {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["id", "path", "url"],
        },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!(await user.checkPassword(password))) {
      throw new Error("Password does not match");
    }

    const { id, name, isAdmin, avatar } = user;

    return { id, name, isAdmin, avatar };
  }
})();
