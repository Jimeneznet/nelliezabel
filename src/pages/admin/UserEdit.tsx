import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../lib/config/firebase.config";
import { getUser } from '../../hooks/useGetAuth'
import { userUpdate } from "hooks/userUpdate";
import Header from "components/Header";
import EditUserView from "components/admin/EditUserView";

const UserEdit = () => {
    const {uid}=useParams();
    const [user, loading, error] = useAuthState(auth);
    const [rol, setRol] = useState("");
    const [nombre, setNombre] = useState("");
    const [rut, setRut] = useState("");
    const navigate = useNavigate();

    function submitHandler(e: any) {
        e.preventDefault();

        userUpdate(uid,nombre,rut);
        console.log(rut);
        console.log(nombre);
        
        navigate('/');
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        
        getUser(uid).then((u:any) => setRol(u.data().rol))
        getUser(uid).then((u:any) => setNombre(u.data().nombre))
        getUser(uid).then((u:any) => setRut(u.data().rut))
      }, [user, loading]);

      return (
        <div>
            <Header>
            <h2>Editar Usuario</h2>
            </Header>
            <EditUserView submitHandler={(e: any) => submitHandler(e)}rut={rut}nombre={nombre}setNombre={setNombre}setRut={setRut}></EditUserView>
        </div>
    )
}
export default UserEdit