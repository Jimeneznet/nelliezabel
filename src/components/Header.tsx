import { auth, logout } from "../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const Header = ({ children }: any) => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="navbar bg-secondaryHeader  h-[7rem] shadow-2xl z-1">
      <div className="navbar-start">
        <h1 className="text-white text-lg lg:text-5xl lg:px-7">{children}</h1>
      </div>
      <div className="navbar-center">
        {user ? null : (
          <div>
            <Link className="text-[#fbfbfb] mx-4 text-xs lg:text-xl lg:mx-16 lg:w-40" to="/">
              Portal de noticias
            </Link>
            <Link
              className="text-[#fbfbfb] text-xs lg:text-xl lg:mx-16 lg:w-40"
              to="/dictionary"
            >
              Diccionario
            </Link>
          </div>
        )}
      </div>
      <div className="navbar-end">
        {user ? (
          <div>
            <Link className="btn btn-ghost text-xs lg:mx-4 lg:text-base text-white" to="/user/credentials">
              Cambiar Credenciales
            </Link>
            <button
              className="btn btn-ghost text-xs lg:mx-4 lg:text-base text-white"
              onClick={() => logout()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div>
            <Link className="text-[#fbfbfb] text-xs lg:mx-9 lg:text-xl" to="/login">
              Iniciar Sesion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
