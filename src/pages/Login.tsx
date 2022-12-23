import { useEffect } from "react";
import LoginView from "../components/LoginView";
import { auth, logInWithEmailAndPassword } from "../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../lib/context/user.context";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const userContext = useUser();
  const navigate = useNavigate();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    try {
      await logInWithEmailAndPassword(email, password);
      userContext.dispatch({ type: "login", user: {} });
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error, vuelva a intentarlo más tarde.");
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/admin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <Header>Fundacion Nellie Zabel</Header>
      <LoginView submitHandler={(e: any) => submitHandler(e)}></LoginView>
    </div>
  );
};

export default Login;
