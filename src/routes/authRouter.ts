import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { loginValidator } from "../validators/loginValidator";
import { inputValidationMiddleware } from "../validators/inputValidationMiddleware";

export const secretKey =
  "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";

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
      const token = jwt.sign({ loginOrEmail }, secretKey, { expiresIn: "1h" });
      return res.status(HTTP_STATUSES.OK_200).json({ token });
    } else {
      return res
        .status(HTTP_STATUSES.UNAUTHORIZED_401)
        .json({ error: "Invalid credentials" });
    }
  }
);
