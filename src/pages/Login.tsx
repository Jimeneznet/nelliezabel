import React, { useEffect, useState } from 'react'
import LoginView from '../components/LoginView';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    function submitHandler(e: any) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        console.log("submit", email, password);

        logInWithEmailAndPassword(email,password);
        

    }

    function iniciarConGoogle(e: any) {
        signInWithGoogle();
    }

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/");
      }, [user, loading]);
    return (
        <div>
            <LoginView submitHandler={(e: any) => submitHandler(e)}></LoginView>
            <button onClick={iniciarConGoogle}>Google</button>
            {error && <h1>Error al conectar</h1>}
        </div>
    )
}

export default Login