import { Router, Request, Response } from "express";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";

export const authRouter = Router({});

authRouter.post("/", async (req: Request, res: Response) => {
  const checkResult = await usersService.checkCredentials(
    req.body.loginOrEmail,
    req.body.password
  );
  if (checkResult) {
    return res.status(HTTP_STATUSES.OK_200).json({ message: "Authorized" });
  } else {
    return res
      .status(HTTP_STATUSES.UNAUTHORIZED_401)
      .json({ message: "Wrong user name or password" });
  }
});
