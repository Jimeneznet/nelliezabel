import { collection, getDocs } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';

async function getData() {
    const q = await getDocs(collection(db,'words'));
    return q.docs;
}

export {getData}