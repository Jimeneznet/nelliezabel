import Header from "components/Header";
import { auth } from "../lib/config/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import ForgotPasswordView from "components/ForgotPasswordView";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const submitHandler = (e: any) => {
        e.preventDefault();
        if(!RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(email)){
            alert("El email tiene un formato incorrecto");
            return;
          }
        
        sendPasswordResetEmail(auth, email);
        alert("Se ha enviado una verificación a su correo");
    }
    return (
        <div>
            <Header>
                Restablecer Contraseña
            </Header>
            <ForgotPasswordView submitHandler={submitHandler} email={email} setEmail={setEmail}/>
        </div>
    )
}

export default ForgotPassword;