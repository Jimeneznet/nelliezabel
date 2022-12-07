import { collection, getDocs } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';

async function getWords() {
    try{
        const q = await getDocs(collection(db,'words'));
        return q.docs;
    }catch(err){
        console.log(err)
    }
}

export {getWords}