import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../lib/config/firebase.config";
import { getUser } from '../../hooks/useGetAuth'
import { userUpdate } from "hooks/userUpdate";
import Header from "components/Header";
import EditUserView from "components/admin/EditUserView";
import Layout from "../../components/Layout";
import LoadingBar from "../../components/LoadingBar";

const UserEdit = () => {
    const {uid}=useParams();
    const [user, loading, error] = useAuthState(auth);
    const [rol, setRol] = useState("");
    const [nombre, setNombre] = useState("");
    const [rut, setRut] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    function submitHandler(e: any) {
        e.preventDefault();

        userUpdate(uid,nombre,rut);
        console.log(rut);
        console.log(nombre);
        
        navigate('/admin/users');
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        
        getUser(uid).then((u:any) => {
          setRol(u.data().rol);
          setNombre(u.data().nombre);
          setRut(u.data().rut);
          setIsLoading(false);
        })
      }, [user, loading]);

      return (
        <div>
          <Header>Editar Usuario</Header>
          <Layout>
            { isLoading ? (
              <LoadingBar/>
            ) :( 
              <EditUserView 
                submitHandler={(e: any) => submitHandler(e)}
                rut={rut}
                nombre={nombre}
                setNombre={setNombre}
                setRut={setRut}
              />)
            }
          </Layout>
        </div>
    )
}
export default UserEdit