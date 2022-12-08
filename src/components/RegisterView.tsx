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
                    Nombre:
                    <input type="text" id="nombre" />
                </label>

                <label>
                    Contraseña:
                    <input type="password" id="password" />
                </label>                
                <label>
                    Rut:
                    <input type="text" id="rut" />
                </label>

                <label>
                    Rol:
                    <select id="rol">
                        <option value="Administrador">Administrador</option>
                        <option value="Consultor">Consultor</option>
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