import { NextFunction, Request, Response } from "express";

import { HTTP_STATUSES } from "../http_statuses";
import { jwtService } from "../application /jwtService";
import { usersService } from "../domain/usersService";

export async function basicTokenValidator(
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
  const userId = await jwtService.getUserIdByToken(token);

  if (!userId) {
    return res
      .status(HTTP_STATUSES.UNAUTHORIZED_401)
      .json({ error: "Unauthorized" });
  } else {
    req.user = await usersService.findUserById(userId);
    next();
  }
}
