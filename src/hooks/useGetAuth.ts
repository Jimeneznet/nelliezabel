import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/config/firebase.config";

const getUser = async (uid: any) => {
    try {
        const q = query(collection(db,'usuarios'),where('uid', '==', uid));
        const docs = await getDocs(q);
        if (!docs.empty) {
            return docs.docs.shift();
        }
    } catch (error) {
        return "error";
    }
}

export {getUser};