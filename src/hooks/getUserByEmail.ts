import { db } from "../lib/config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useGetUserByEmail = () => getUserByEmail;

const getUserByEmail = async (email: string) => {
  const usersRef = collection(db, "usuarios");
  const q = query(usersRef, where("email", "==", email));
  const users = await getDocs(q);
  const user = users.docs.shift();
  if (!user) {
    return null;
  }
  return user;
};
