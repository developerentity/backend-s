import { UserDBType } from "../domain/usersService";

declare global {
  declare namespace Express {
    export interface Request {
      user: UserDBType | null;
    }
  }
}
