import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
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

import { Navigate, useNavigate } from "react-router-dom";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe69243D4_2zTupe-91DKsw4_m-CukmXE",
  authDomain: "pr-topicos-avanzados.firebaseapp.com",
  projectId: "pr-topicos-avanzados",
  storageBucket: "pr-topicos-avanzados.appspot.com",
  messagingSenderId: "258464120558",
  appId: "1:258464120558:web:bca8504cbaed6d8358fdff",
  measurementId: "G-L81KF505QW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export default app;


//Se agregó esta funcion
export async function uploadVideo(file:any){
  const storageRef = ref(storage,file.name)
  await uploadBytes(storageRef,file)
  const url = await getDownloadURL(storageRef)
  return url
}

export const getTask = (id:any) => getDoc(doc(db,'words',id))

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "usuarios"), {
        uid: user.uid,
        rol: 'user',
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email:any, password:any) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (rol:any, email:any, password:any, rut:any,nombre:any,status:any) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "usuarios"), {
      uid: user.uid,
      rol,
      authProvider: "local",
      email,
      rut,
      nombre,
      status,
    });
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};



export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
