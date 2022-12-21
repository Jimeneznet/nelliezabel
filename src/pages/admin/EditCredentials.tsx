import { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../lib/config/firebase.config";
import { userEditCredentials } from "hooks/userEditCredentials";
import Header from "components/Header";
import Layout from "../../components/Layout";
import LoadingBar from "../../components/LoadingBar";
import EditCredentialsView from "../../components/admin/EditCredentialsView";
import { useGetUserByEmail } from "../../hooks/getUserByEmail";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { EditCredentialsInputs } from "../../lib/types/adminForm.types";
import { useUser } from "../../lib/context/user.context";

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
  const userContext = useUser();

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

  const submitHandler = async (e: FormEvent) => {
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
    if (currentUserDoc.data().email !== editCredentialInputs.email) {
      const documento = collection(db, "usuarios");
      const esEmail = query(
        documento,
        where("email", "==", editCredentialInputs.email)
      );

      const querySnapshotEmail = await getDocs(esEmail);
      const userByEmailDoc = querySnapshotEmail.docs.shift();

      if (userByEmailDoc) {
        alert("El email ingresado ya se encuentra en uso");
        return;
      }
    }
    userEditCredentials(
      editCredentialInputs.email,
      editCredentialInputs.password,
      editCredentialInputs.nombre,
      currentUserDoc,
      userContext
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
