import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAe69243D4_2zTupe-91DKsw4_m-CukmXE",
//     authDomain: "pr-topicos-avanzados.firebaseapp.com",
//     projectId: "pr-topicos-avanzados",
//     storageBucket: "pr-topicos-avanzados.appspot.com",
//     messagingSenderId: "258464120558",
//     appId: "1:258464120558:web:bca8504cbaed6d8358fdff",
//     measurementId: "G-L81KF505QW"
//   };

// Firebase Luis Cubillos
const firebaseConfig = {
  apiKey: "AIzaSyCG1lk1q8deAllV4MY7BoOfX0Akui7rSLU",
  authDomain: "nelliezabel.firebaseapp.com",
  projectId: "nelliezabel",
  storageBucket: "nelliezabel.appspot.com",
  messagingSenderId: "83106487872",
  appId: "1:83106487872:web:88ccf517a39d3edd0109a5",
  measurementId: "G-Q55BR6RRDC"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;