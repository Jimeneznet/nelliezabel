import React from 'react'


const LoginView = ({ submitHandler }: any) => {
    return (
        <div><form onSubmit={submitHandler}>
            <label>
                Correo electrónico:
                <input type="email" id="email" />
            </label>

            <label>
                Contraseña:
                <input type="password" id="password" />
            </label>

            <input
                type="submit"
                value={"Iniciar Sesión"}
            />
        </form></div>
    )
}

export default LoginView