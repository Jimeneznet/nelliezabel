import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { 
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getDoc, } from "firebase/firestore";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe69243D4_2zTupe-91DKsw4_m-CukmXE",
  authDomain: "pr-topicos-avanzados.firebaseapp.com",
  projectId: "pr-topicos-avanzados",
  storageBucket: "pr-topicos-avanzados.appspot.com",
  messagingSenderId: "258464120558",
  appId: "1:258464120558:web:bca8504cbaed6d8358fdff",
  measurementId: "G-L81KF505QW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
export const storage = getStorage(app);

//Se agregó esta funcion
export async function uploadVideo(file:any){
  const storageRef = ref(storage,file.name)
  await uploadBytes(storageRef,file)
  const url = await getDownloadURL(storageRef)
  return url
}

export const getTask = (id:any) => getDoc(doc(db,'words',id))
