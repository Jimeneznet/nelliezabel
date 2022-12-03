import React from 'react'

const RegisterView = ({ submitHandler }:any) => {
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    Correo electrónico:
                    <input type="email" id="email" />
                </label>

                <label>
                    Contraseña:
                    <input type="password" id="password" />
                </label>

                <label>
                    Rol:
                    <select id="rol">
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </label>

                <input
                    type="submit"
                    value={"Registrar"}
                />
            </form>
        </div>
    )
}

export default RegisterView