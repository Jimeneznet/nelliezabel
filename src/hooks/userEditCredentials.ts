import { User, userContextType } from "../lib/types/user.types";
import { updateEmail, updatePassword } from "firebase/auth";
import {
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../lib/config/firebase.config";

export const userEditCredentials = async (
  email: string,
  password: string,
  nombre: string,
  currentUserDoc: QueryDocumentSnapshot<DocumentData>,
  userContext: userContextType
) => {
  if (!auth.currentUser) {
    return;
  }
  const userData = userContext.user as User;
  userContext.dispatch({
    type: "login",
    user: { ...userData, nombre, email },
  });
  await updatePassword(auth.currentUser, password);
  await updateEmail(auth.currentUser, email);
  await updateDoc(currentUserDoc.ref, {
    email,
    nombre,
  });
};
