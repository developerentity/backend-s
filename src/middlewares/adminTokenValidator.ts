import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HTTP_STATUSES } from "../http_statuses";
import { SECRET_ACCESS_TOKEN } from "../config";

interface DecodedToken extends JwtPayload {
  role: "basic" | "admin";
}

export function adminTokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    debugger;
    return res
      .status(HTTP_STATUSES.UNAUTHORIZED_401)
      .json({ error: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(
      token,
      SECRET_ACCESS_TOKEN!
    ) as DecodedToken;
    if (decodedToken.role !== "admin") {
      return res
        .status(HTTP_STATUSES.UNAUTHORIZED_401)
        .json({ error: "Unauthorized" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(HTTP_STATUSES.UNAUTHORIZED_401)
      .json({ error: "Unauthorized" });
  }
}
