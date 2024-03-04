import { Router, Request, Response } from "express";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { loginValidator } from "../validators/loginValidator";
import { inputValidationMiddleware } from "../validators/inputValidationMiddleware";

export const authRouter = Router({});

authRouter.post(
  "/",
  loginValidator,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const checkResult = await usersService.checkCredentials(
      loginOrEmail,
      password
    );
    if (checkResult) {
      return res.status(HTTP_STATUSES.OK_200).json({ message: "Authorized" });
    } else {
      return res
        .status(HTTP_STATUSES.UNAUTHORIZED_401)
        .json({ error: "Invalid credentials" });
    }
  }
);
