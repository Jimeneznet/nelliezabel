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
  currentUserDoc: QueryDocumentSnapshot<DocumentData>
) => {
  if (!auth.currentUser) {
    return;
  }
  await updatePassword(auth.currentUser, password);
  await updateEmail(auth.currentUser, email);
  await updateDoc(currentUserDoc.ref, {
    email,
  });
};
