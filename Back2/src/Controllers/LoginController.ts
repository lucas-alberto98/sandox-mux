import User from "../models/User";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth";
import { Request, Response } from "express";

class LoginController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email, password } });

      if (!user) {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
      }

      const token = await jwt.sign({ userId: user.id }, authConfig.secret);
      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new LoginController();
