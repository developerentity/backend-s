import { Request, Router, Response } from "express";
import jwt from "jsonwebtoken";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { createValidator } from "../validators/createValidator";
import { inputValidationMiddleware } from "../validators/inputValidationMiddleware";
import { SECRET_ACCESS_TOKEN } from "../config";
import { usersQueryRepo } from "../repositories/usersQueryRepo";

export const usersRouter = Router({});

usersRouter.get("/get-users", async (req: Request, res: Response) => {
  // const foundUsers = await usersQueryRepo.getAllUsers();
  // res.send(foundUsers);
});
usersRouter.post(
  "/signup",
  createValidator,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = await usersService.createUser(username, email, password);
    if (user) {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { id: user._id, email, role: user.role },
        SECRET_ACCESS_TOKEN!,
        { expiresIn: maxAge }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(HTTP_STATUSES.CREATED_201).json({
        message: "User successfully Registered and Logged in",
        user: user._id,
      });
    } else {
      res.status(HTTP_STATUSES.UNPROCESSABLE_CONTENT_422).json({
        message: "Register failed",
      });
    }
  }
);
