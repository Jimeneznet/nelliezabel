import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';

async function setWord(word:any) {
    try{
        const word_to_set = query(collection(db,"words"),where("id","==",word.id))
        
    }catch(err){
        console.log(err)
    }
    
}

export {setWord}