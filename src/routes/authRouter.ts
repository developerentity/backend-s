import { Router, Request, Response } from "express";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { loginValidator } from "../validators/loginValidator";
import { Validate } from "../middlewares/Validate";
import { jwtService } from "../application /jwtService";

export const authRouter = Router({});

authRouter.post(
  "/signin",
  loginValidator,
  Validate,
  async (req: Request, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const user = await usersService.checkCredentials(loginOrEmail, password);
    if (user) {
      const maxAge = 3 * 60 * 60;
      const token = jwtService.createJWT(user);
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
