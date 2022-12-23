import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';

async function newWord(word:any ,description:any ,category:any, url:any,isForAppMobile:any ) {
    const docRef = await addDoc(collection(db,"words"),{
        word: word,
        description: description,
        category: category,
        video: url,
        forAppMobile: isForAppMobile,
    });
}

export {newWord}