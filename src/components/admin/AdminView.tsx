import LoadingBar from "../LoadingBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateUserStatus } from "../../hooks/userUpdateStatus";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/config/firebase.config";
import { User, UserRole } from "../../lib/types/user.types";
import { useUser } from "../../lib/context/user.context";
import UserSearch from "./UserSearch";
import Disable from "../../assets/admin/disable.png";
import Enable from "../../assets/admin/enable.png";
import Erase from "../../assets/admin/erase.png";
import Restore from "../../assets/admin/restore.png";
import Edit from "../../assets/admin/edit.png";
import RestorePassword from "../../assets/admin/restorePassword.png";
import AddUser from "../../assets/admin/addUser.png";
import Search from "../../assets/admin/search.png";

const AdminView = ({ userDoc, users, handleSearch }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userContext = useUser();
  const redirect = useNavigate();
  useEffect(() => {
    const handleGetUser = async () => {
      const userData = userContext.user as User;
      if (userData.rol !== UserRole.Aministrador) redirect("/admin");
      setIsLoading(false);
    };
    handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-10">
      {isLoading || !userDoc ? (
        <LoadingBar />
      ) : (
        <div>
          <div className="flex flex-row items-center mb-8">
            <Link className="mx-2" to="/register">
              <button className="">
                <img src={AddUser} alt="disable user icon" width="70px" />
              </button>
            </Link>
            <UserSearch handleSearch={handleSearch} />
            <img src={Search} alt="search icon" width="50px" className="mr-16" />
          </div>
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
                        <img
                          src={user.status === "1" ? Enable : Disable}
                          alt="disable user icon"
                          width="70px"
                        />
                      </td>
                      <td>
                        <Link to={`/admin/users/edit/${user.uid}`}>
                          <img
                            className="hover:bg-[#e0e0e0f5] rounded-3xl"
                            src={Edit}
                            alt="disable user icon"
                            width="70px"
                          />
                        </Link>
                      </td>
                      <td>
                        <button
                          className="hover:bg-[#e0e0e0f5] rounded-3xl"
                          onClick={() =>
                            updateUserStatus(user.uid, user.status)
                          }
                        >
                          <img
                            src={user.status === "1" ? Erase : Restore}
                            alt="disable user icon"
                            width="70px"
                          />
                        </button>
                      </td>
                      <td>
                        <button
                          className="hover:bg-[#e0e0e0f5] rounded-3xl"
                          onClick={() => {
                            sendPasswordResetEmail(auth, user.email);
                            alert(
                              "Se ha enviado un correo al usuario para restablecer contraseña"
                            );
                          }}
                        >
                          <img
                            src={RestorePassword}
                            alt="disable user icon"
                            width="70px"
                          />
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
