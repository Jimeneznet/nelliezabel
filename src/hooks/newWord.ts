import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';

async function newWord(word:any ,description:any ,category:any, url:any ) {
    try{
        const docRef = await addDoc(collection(db,"words"),{
            word: word,
            description: description,
            category: category,
            video: url,
        });
    }catch(err){
        console.log(err)
    }
}

export {newWord}