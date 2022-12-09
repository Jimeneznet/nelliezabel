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
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjixEsVtWDZE-cGsB_xYdmmSCW4p6AT5s",
  authDomain: "crudusuarios-59bf0.firebaseapp.com",
  projectId: "crudusuarios-59bf0",
  storageBucket: "crudusuarios-59bf0.appspot.com",
  messagingSenderId: "191315101630",
  appId: "1:191315101630:web:7782e09545dfb0e3795bef"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
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