import jwt from "jsonwebtoken";
import StoreSessionService from "../services/SessionService/StoreSessionService";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const { id, name, isAdmin, avatar } = await StoreSessionService.run({
        email,
        password,
      });

      return res.json({
        user: {
          id,
          name,
          email,
          isAdmin,
          avatar,
          token: jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        },
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new SessionController();
