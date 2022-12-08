import React, { useEffect, useState } from 'react'
import RegisterView from '../components/RegisterView';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
  } from "../lib/config/firebase.config";

import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

const Register = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    async function registrarUsuario(email: string, password: string, rol: string,rut:string,nombre:string,status:string) {
        registerWithEmailAndPassword(rol,email,password,rut,nombre,status);
    }

    function submitHandler(e: any) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = '123456'; //Editar proximamente
        const rol = e.target.elements.rol.value;
        const rut = e.target.elements.rut.value;
        const nombre = e.target.elements.nombre.value;
        const status = '1';

        console.log("submit", email, password, rol);

        registrarUsuario(email, password, rol,rut,nombre,status);
        
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");

      }, [user, loading]);

    return (
        <div>
            <Header>
            <h2>Agregar Usuario</h2>
            </Header>
            <RegisterView submitHandler={(e: any) => submitHandler(e)}></RegisterView>
        </div>
    )
}

export default Register