import { sendEmailVerification, updateCurrentUser, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../lib/config/firebase.config";

export const userEditCredentials = async(email: string, password: string) => {
    if(!auth.currentUser){
        return;
    }
    await updatePassword(auth.currentUser, password);
    await updateEmail(auth.currentUser, email);
}