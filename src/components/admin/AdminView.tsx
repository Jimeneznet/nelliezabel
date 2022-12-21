import LoadingBar from "../LoadingBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateUserStatus } from "../../hooks/userUpdateStatus";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/config/firebase.config";
import { User, UserRole } from "../../lib/types/user.types";
import { useUser } from "../../lib/context/user.context";

const AdminView = ({ userDoc, users }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userContext = useUser();
  const redirect = useNavigate();
  useEffect(() => {
    const handleGetUser = async () => {
      const userData = userContext.user as User;
      console.log(userData);
      if (userData.rol !== UserRole.Aministrador) redirect("/admin");
      setIsLoading(false);
    };
    handleGetUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading || !userDoc ? (
        <LoadingBar />
      ) : (
        <div>
          <Link className="mx-2" to="/register">
            <button className="btn">Agregar</button>
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
                  if (userDoc.data().uid === user.uid) {
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
