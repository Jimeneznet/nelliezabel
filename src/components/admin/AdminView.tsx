import LoadingBar from "../LoadingBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../hooks/userGetData";
import { updateUserStatus } from "../../hooks/userUpdateStatus";

const AdminView = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleGetUser = async () => {
      const userDocs = await getData();
      const sanatizedUsers = userDocs.map((doc) => ({
        nombre: doc.data().nombre,
        rut: doc.data().rut,
        id: doc.id,
        email: doc.data().email,
        rol: doc.data().rol,
        status: doc.data().status,
        uid: doc.data().uid,
      }));

      setUsuarios(sanatizedUsers);
      setIsLoading(false);
    };

    handleGetUser();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div>
          <Link to="/register">
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
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user: any, index: number) => (
                  <tr key={index}>
                    <td>{user.nombre}</td>
                    <td>{user.rut}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                    <td>{user.status}</td>
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
                          updateUserStatus(
                            user.uid,
                            user.status,
                            usuarios,
                            setUsuarios
                          )
                        }
                      >
                        cambiar status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
