import React, { useEffect, useState } from "react";
import { logout, auth, db } from "../../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/useGetAuth";
import AdminView from "../../components/admin/AdminView";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const Users = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userDoc, setUserDoc] = useState<any>();
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    const handleGetUserDoc = async () => {
      const userDoc = await getUser(user.uid);
      setUserDoc(userDoc);
    };
    handleGetUserDoc();
  }, [user, loading]);

  return (
    <div>
      <Header>Administración de usuarios</Header>
      <Layout>
        <AdminView userDoc={userDoc} />
      </Layout>
    </div>
  );
};
//logout deberia redireccionar
export default Users;
