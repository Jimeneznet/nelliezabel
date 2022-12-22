import React, { useEffect, useState } from "react";
import { logout, auth, db } from "../../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/useGetAuth";
import AdminView from "../../components/AdminView";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const Users = () => {
  const [user, loading, error] = useAuthState(auth);
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    getUser(user.uid).then((u: any) => setRol(u.data().rol));
  }, [user, loading]);

  return (
    <div>
      <Header>Administración de usuarios</Header>
      <Layout>
        <AdminView />
      </Layout>
    </div>
  );
};
//logout deberia redireccionar
export default Users;
