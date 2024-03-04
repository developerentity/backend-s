import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import { usersRepo } from "../repositories/usersRepo";

/**
 *  This is a BLL (Business Logic Layer).
 *  Which most commonly responsible for CUD operations (CRUD without Read).
 */
export const usersService = {
  async createUser(
    login: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: UserDBType = {
      _id: new ObjectId(),
      userName: login,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    return usersRepo.createUser(newUser);
  },
  async findUserById(id: ObjectId): Promise<UserDBType | null> {
    return usersRepo.findUserById(id);
  },
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersRepo.findByLoginOrEmail(loginOrEmail);
    if (!user) return false;

    const storedHashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(
      password,
      storedHashedPassword
    );

    if (isPasswordValid) {
      return true;
    } else {
      return false;
    }
  },
};

export type UserDBType = {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
};
