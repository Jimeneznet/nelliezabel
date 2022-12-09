import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../lib/config/firebase.config";


const updateUserStatus = async (uid: any, status: any) => {
  try {
    const q = query(collection(db, "usuarios"), where("uid", "==", uid));
    const docs = await getDocs(q);
    if (!docs.empty) {
      const user = docs.docs.shift();
      if (user) {
        const userRef = user.ref;
        updateDoc(userRef, {
          status: status == "1"? "0":"1",
        });
      }
    }
  } catch (error) {
    return "error";
  }
};

export { updateUserStatus };
