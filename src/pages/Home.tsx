import React, { useEffect, useState } from 'react'
import { logout, auth, db } from "../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from '../hooks/useGetAuth'
import UserView from '../components/UserView';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [rol, setRol] = useState("");
  const navigate = useNavigate();
  
  


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    

    getUser(user.uid).then((u:any) => setRol(u.data().rol))
  }, [user, loading]);
  
  return (
    <div>
      <UserView></UserView>
      <button onClick={() => logout()}> Cerrar Sesión</button>
      <h1>{rol}</h1>
    </div>
  )
}
//logout deberia redireccionar
export default Home