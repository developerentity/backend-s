import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretKey } from "../routes/authRouter";

function authenticateToken(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // req.user = decoded; 
    next();
  });
}
