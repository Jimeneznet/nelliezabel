import { Dispatch } from "react";
import { User } from "../lib/types/user.types";

export const useSearchUserByRut = () => handleSearchUserByRut;

const handleSearchUserByRut = (
  users: User[] | undefined,
  rut: string,
  setFilteredUsers: Dispatch<User[]>
) => {
  if (!users) return;
  if (rut.length === 0) {
    setFilteredUsers(users);
    return;
  }
  const searchedUsers = users.filter((user) =>
    user.rut.includes(rut) ? user : null
  );
  setFilteredUsers(searchedUsers);
};
