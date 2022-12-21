import { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/config/firebase.config";
import { userEditCredentials } from "hooks/userEditCredentials";
import Header from "components/Header";
import Layout from "../../components/Layout";
import LoadingBar from "../../components/LoadingBar";
import EditCredentialsView from "../../components/admin/EditCredentialsView";
import { useGetUserByEmail } from "../../hooks/getUserByEmail";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { EditCredentialsInputs } from "../../lib/types/adminForm.types";

const defaultInputsValue = {
  nombre: "",
  email: "",
  password: "",
  verification: "",
};

const UserEditCredentials = () => {
  const getUserByEmail = useGetUserByEmail();
  const [user, loading] = useAuthState(auth);
  const [editCredentialInputs, setEditCredentialInputs] =
    useState<EditCredentialsInputs>(defaultInputsValue);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (editCredentialInputs.password !== editCredentialInputs.verification) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (
      !RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(
        editCredentialInputs.email
      )
    ) {
      alert("El email tiene un formato incorrecto");
      return;
    }

    if (!currentUserDoc) {
      return;
    }

    userEditCredentials(
      editCredentialInputs.email,
      editCredentialInputs.password,
      editCredentialInputs.nombre,
      currentUserDoc
    );

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
            submitHandler={(e: FormEvent) => submitHandler(e)}
            editCredentialInputs={editCredentialInputs}
            setEditCredentialInputs={setEditCredentialInputs}
          />
        )}
      </Layout>
    </div>
  );
};
export default UserEditCredentials;
