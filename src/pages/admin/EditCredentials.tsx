import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../lib/config/firebase.config";
import { userEditCredentials } from "hooks/userEditCredentials";
import Header from "components/Header";
import Layout from "../../components/Layout";
import LoadingBar from "../../components/LoadingBar";
import EditCredentialsView from "../../components/admin/EditCredentialsView";
import { useGetUserByEmail } from "../../hooks/getUserByEmail";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const UserEditCredentials = () => {
  const getUserByEmail = useGetUserByEmail();
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const [currentUserDoc, setCurrentUserDoc] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    const handleGetUser = async () => {
      const userDoc = await getUserByEmail(auth.currentUser?.email as string);
      if (!userDoc) {
        return;
      }
      setCurrentUserDoc(userDoc);
      setIsLoading(false);
    };
    handleGetUser();
  }, [user, loading]);

  const submitHandler = (e: any) => {
    if (password !== verification) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!currentUserDoc) {
      return;
    }
    userEditCredentials(email, password, currentUserDoc);

    navigate("/admin/users");
  };

  return (
    <div>
      <Header>Editar Credenciales</Header>
      <Layout>
        {isLoading ? (
          <LoadingBar />
        ) : (
          <EditCredentialsView
            submitHandler={(e: any) => submitHandler(e)}
            email={email}
            password={password}
            verification={verification}
            setEmail={setEmail}
            setPassword={setPassword}
            setVerification={setVerification}
          />
        )}
      </Layout>
    </div>
  );
};
export default UserEditCredentials;
