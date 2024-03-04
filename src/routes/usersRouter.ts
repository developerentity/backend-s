import { Request, Router, Response } from "express";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { usersRepo } from "../repositories/usersRepo";
import { createValidator } from "../validators/createValidator";
import { inputValidationMiddleware } from "../validators/inputValidationMiddleware";

export const usersRouter = Router({});

usersRouter.get("/", async (req: Request, res: Response) => {
  const foundUsers = await usersRepo.getAllUsers();
  res.send(foundUsers);
});
usersRouter.post(
  "/",
  createValidator,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const newUser = await usersService.createUser(username, email, password);
    res.status(HTTP_STATUSES.CREATED_201).send(newUser);
  }
);
