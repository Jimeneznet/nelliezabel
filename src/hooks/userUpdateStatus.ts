import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../lib/config/firebase.config";

const updateUserStatus = async (
  uid: any,
  status: any,
  users: any[],
  setUsers: Dispatch<SetStateAction<any[]>>
) => {
  try {
    const q = query(collection(db, "usuarios"), where("uid", "==", uid));
    const docs = await getDocs(q);
    if (!docs.empty) {
      const user = docs.docs.shift();
      if (user) {
        const userRef = user.ref;
        await updateDoc(userRef, {
          status: status === "1" ? "0" : "1",
        });
        const newUsersState = users.map((user) => {
          if (uid !== user.uid) {
            return user;
          }
          return { ...user, status: status === "1" ? "0" : "1" };
        });

        setUsers(newUsersState);
      }
    }
  } catch (error) {
    return "error";
  }
};

export { updateUserStatus };
