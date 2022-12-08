import { collection, getDocs, query, updateDoc, where,doc } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';
import { getWords } from "./getWords";

async function editWord(word:any) {
    try{
        const word_no_id = {
            word: word.word,
            description: word.description,
            category: word.category,
        }
        const words_collection_ref = collection(db,'words')
        const word_to_edit = doc(words_collection_ref,word.id)
        console.log(word_no_id.word)
        updateDoc(word_to_edit,word_no_id)
    }
    catch(err){
        console.log(err)
    }
    
}

export {editWord}