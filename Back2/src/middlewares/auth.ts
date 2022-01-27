import jwt from "jsonwebtoken";

// const Session = require('../app/models/Session');

import authConfig from "../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded: any = await jwt.verify(token, authConfig.secret);

    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid." });
  }
};
