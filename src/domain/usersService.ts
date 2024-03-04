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
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    const newUser: UserDBType = {
      _id: new ObjectId(),
      userName: login,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
    };

    return usersRepo.createUser(newUser);
  },
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersRepo.findByLoginOrEmail(loginOrEmail);
    if (!user) return false;
    const passwordHash = await this._generateHash(password, user.passwordSalt);
    if (user.passwordHash !== passwordHash) return false;
    return true;
  },
  _generateHash(password: string, salt: string) {
    const hash = bcrypt.hash(password, salt);
    console.log("Hash: " + hash);
    return hash;
  },
};

export type UserDBType = {
  _id: ObjectId;
  userName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
};
