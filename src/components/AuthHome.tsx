import { User } from "../lib/types/user.types";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const AuthHome = ({ userData }: { userData: User }) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${Logo})`,
        backgroundSize: "55%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay bg-opacity-90 bg-[#f4eefc]"></div>
      <div className="hero-content text-center text-[#47525e]">
        <div className="pb-12 min-w-lg">
          <h1 className="mb-5 text-5xl font-bold">
            ¡Bienvenido {userData.nombre}!
          </h1>
          <p className="mb-5 text-xl">
            ¡Es un agrado tenerte de vuelta apoyando a la comunidad sorda!
          </p>
          <Link
            to={
              userData.rol === "Administrador" ? "/admin/users" : "/admin/news"
            }
            className="btn btn-primary"
          >
            Comencemos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
