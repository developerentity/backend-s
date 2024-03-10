import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { HTTP_STATUSES } from "../http_statuses";
import { SECRET_ACCESS_TOKEN } from "../config";

export function basicTokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(HTTP_STATUSES.UNAUTHORIZED_401)
      .json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(token, SECRET_ACCESS_TOKEN!);
    next();
  } catch (error) {
    return res
      .status(HTTP_STATUSES.UNAUTHORIZED_401)
      .json({ error: "Unauthorized" });
  }
}
