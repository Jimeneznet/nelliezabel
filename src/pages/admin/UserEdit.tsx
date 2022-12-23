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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    function submitHandler(e: any) {
        e.preventDefault();

        if(!RegExp("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+(\\s*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]*)*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+$").test(nombre)){
          alert("El nombre debe tener sólo letras");
          return;
        }

        userUpdate(uid,nombre,rol);
        
        navigate('/admin/users');
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        
        getUser(uid).then((u:any) => {
          setRol(u.data().rol);
          setNombre(u.data().nombre);
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
                nombre={nombre}
                rol={rol}
                setNombre={setNombre}
                setRol={setRol}
              />)
            }
          </Layout>
        </div>
    )
}
export default UserEdit