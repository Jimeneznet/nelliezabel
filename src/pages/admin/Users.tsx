import { useEffect, useState } from "react";
import { auth, db } from "../../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/useGetAuth";
import AdminView from "../../components/admin/AdminView";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { collection, query, onSnapshot } from "firebase/firestore";

const Users = () => {
  const [user, loading] = useAuthState(auth);
  const [userDoc, setUserDoc] = useState<any>();
  const [users, setUsers] = useState<any>();
  const navigate = useNavigate();

  const firebaseListener = () => {
    const q = query(collection(db, "usuarios"));
    onSnapshot(q, (querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        users.push({
          nombre: doc.data().nombre,
          rut: doc.data().rut,
          id: doc.id,
          email: doc.data().email,
          rol: doc.data().rol,
          status: doc.data().status,
          uid: doc.data().uid,
        });
      });
      setUsers(users);
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    
    const handleGetUserDoc = async () => {
      const userDoc = await getUser(user.uid);
      setUserDoc(userDoc);
    };
    
    firebaseListener();
    handleGetUserDoc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div>
      <Header>Administración de usuarios</Header>
      <Layout>
          <AdminView userDoc={userDoc} users={users} />
      </Layout>
    </div>
  );
};
//logout deberia redireccionar
export default Users;
