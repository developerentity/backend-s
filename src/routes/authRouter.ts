import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { loginValidator } from "../validators/loginValidator";
import { inputValidationMiddleware } from "../validators/inputValidationMiddleware";
import { SECRET_ACCESS_TOKEN } from "../config";

export const authRouter = Router({});

authRouter.post(
  "/signin",
  loginValidator,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const user = await usersService.checkCredentials(loginOrEmail, password);
    if (user) {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { id: user._id, loginOrEmail, role: user.role },
        SECRET_ACCESS_TOKEN!,
        { expiresIn: maxAge }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(HTTP_STATUSES.OK_200).json({
        message: "User successfully Logged in",
        user: user._id,
      });
    } else {
      return res
        .status(HTTP_STATUSES.UNAUTHORIZED_401)
        .json({ error: "Invalid credentials" });
    }
  }
);

authRouter.get("/signout", async (req, res) => {
  res.cookie("token", "", { maxAge: 0 }).sendStatus(HTTP_STATUSES.OK_200);
});
