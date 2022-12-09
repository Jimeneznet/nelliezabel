import { addDoc, collection, getDocs , deleteDoc,doc} from "firebase/firestore";
import { db } from '../lib/config/firebase.config';

async function deleteWord(id:any ) {
    try{
        await deleteDoc(doc(db,"words",id));
    }catch(err){
        console.log(err)
    }
}

export {deleteWord}