import { UserDBType } from "../domain/usersService";
import { UserViewModel } from "../models/users/UserViewModel";

export const getUserViewModel = (dbUser: UserDBType): UserViewModel => {
  return {
    id: dbUser._id.toString(),
    username: dbUser.username,
    email: dbUser.email,
  };
};
