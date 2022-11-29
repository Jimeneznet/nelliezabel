import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from '../context/authContext'


export const Login = () => {
  //const { login } = useAuth()

/*   const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    //login(user.email, user.password).then(() => navigate('/home'))
    navigate("/admin/dictionary");
  } */

  return (
    <div>
      {/*
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label className=" text-black">email:</label>
        <input is="email" name="email" type="email" onInput={handleChange} />
        <label className=" text-black">password:</label>
        <input
          id="password"
          name="password"
          type="password"
          onInput={handleChange}
        />
        <input className=" text-black" type="submit" value="Iniciar sesion" />
      </form>
       */}
    </div>
  );
};
