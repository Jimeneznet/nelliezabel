import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../lib/config/firebase.config";
import { getUser } from '../../hooks/useGetAuth'
import { userEditCredentials } from "hooks/userEditCredentials";
import Header from "components/Header";
import EditUserView from "components/admin/EditUserView";
import Layout from "../../components/Layout";
import LoadingBar from "../../components/LoadingBar";
import EditCredentialsView from "@components/admin/EditCredentialsView";

const UserEditCredentials = () => {
    const {uid}=useParams();
    const [user, loading] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verification, setVerification] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    
    function submitHandler(e: any) {

        if(password !== verification){
          alert("Las contraseñas no coinciden");
          return;
        }

        userEditCredentials(email, password);
        
        navigate('/admin/users');
    }

      useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        
        getUserByEmail(email).then((u:any) => {
          setEmail(u.data().rol);
          setIsLoading(false);
        })
      }, [user, loading]);

      return (
        <div>
          <Header>Editar Credenciales</Header>
          <Layout>
            { isLoading ? (
              <LoadingBar/>
            ) :( 
              <EditCredentialsView 
                submitHandler={(e: any) => submitHandler(e)}
                email={email}
                password={password}
                verification={verification}
                setEmail={setEmail}
                setPassword={setPassword}
                setVerification={setVerification}
              />)
            }
          </Layout>
        </div>
    )
}
export default UserEditCredentials