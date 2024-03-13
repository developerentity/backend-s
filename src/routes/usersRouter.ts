import { Request, Router, Response } from "express";

import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from "../http_statuses";
import { createValidator } from "../validators/createValidator";
import { Validate } from "../middlewares/Validate";
import { usersQueryRepo } from "../repositories/usersQueryRepo";
import { UsersListViewModel } from "../models/users/UserViewModel";
import { QueryUsersModel } from "../models/users/QueryUsersModel";
import { jwtService } from "../application /jwtService";
import { RequestWithQuery } from "../types/request-types";

export const usersRouter = Router({});

usersRouter.get(
  "/get-users",
  async (
    req: RequestWithQuery<QueryUsersModel>,
    res: Response<UsersListViewModel>
  ) => {
    const foundUsers: UsersListViewModel = await usersQueryRepo.getAllUsers({
      limit: +req.query.pageSize,
      page: +req.query.pageNumber,
      sortField: req.query.sortField,
      sortOrder: req.query.sortOrder,
    });
    res.send(foundUsers);
  }
);
usersRouter.post(
  "/signup",
  createValidator,
  Validate,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = await usersService.createUser(username, email, password);
    if (user) {
      const maxAge = 3 * 60 * 60;
      const token = jwtService.createJWT(user);
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
