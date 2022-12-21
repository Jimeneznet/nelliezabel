import LoadingBar from "../LoadingBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../hooks/userGetData";
import { updateUserStatus } from "../../hooks/userUpdateStatus";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/config/firebase.config";
import { User } from "../../lib/types/user.types";

const AdminView = ({ userDoc, users }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleGetUser = async () => {
      setIsLoading(false);
    };
    handleGetUser();
  }, []);

  return (
    <div>
      {isLoading || !userDoc ? (
        <LoadingBar />
      ) : (
        <div>
          <div className="flex justify-center">
            <h1>Bienvenido {userDoc.data().nombre} !</h1>
          </div>
          <Link className="mx-2" to="/register">
            <button className="btn">Agregar</button>
          </Link>

          <Link className="mx-2" to="/user/credentials">
            <button className="btn">Cambiar Credenciales</button>
          </Link>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Rut</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Status</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                  <th>Restablecer</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: number) => {
                  if (userDoc.data().email === user.email){
                    return null;
                  }
                  return (
                    <tr key={index}>
                      <td>{user.nombre}</td>
                      <td>{user.rut}</td>
                      <td>{user.email}</td>
                      <td>{user.rol}</td>
                      <td>
                        {user.status === "1" ? "Habilitado" : "Deshabilitado"}
                      </td>
                      <td>
                        <Link
                          className="btn"
                          to={`/admin/users/edit/${user.uid}`}
                        >
                          editar
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() =>
                            updateUserStatus(user.uid, user.status)
                          }
                        >
                          cambiar status
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            sendPasswordResetEmail(auth, user.email);
                            alert(
                              "Se ha enviado un correo al usuario para restablecer contraseña"
                            );
                          }}
                        >
                          Reestablecer contraseña
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
