import { Request, Router, Response } from "express";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { usersRepo } from "../repositories/usersRepo";

export const usersRouter = Router({});

usersRouter.get("/", async (req: Request, res: Response) => {
  const foundUsers = await usersRepo.getAllUsers();
  res.send(foundUsers);
});
usersRouter.post("/", async (req: Request, res: Response) => {
  const newUser = await usersService.createUser(
    req.body.login,
    req.body.email,
    req.body.password
  );
  res.status(HTTP_STATUSES.CREATED_201).send(newUser);
});
