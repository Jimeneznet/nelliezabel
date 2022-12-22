import { collection, getDocs, query, updateDoc, where,doc } from "firebase/firestore";
import { db } from '../lib/config/firebase.config';
import { getWords } from "./getWords";
import Swal from 'sweetalert2';

async function editWord(word:any) {
    const word_no_id = {
        word: word.word,
        description: word.description,
        category: word.category,
        video: word.url,
        forAppMobile: word.isChecked
    }
    const words_collection_ref = collection(db,'words')
    const word_to_edit = doc(words_collection_ref,word.id)
    updateDoc(word_to_edit,word_no_id)
}

export {editWord}