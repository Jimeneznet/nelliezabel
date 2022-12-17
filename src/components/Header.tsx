import { auth, logout } from "../lib/config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const Header = ({ children }: any) => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="navbar bg-secondaryHeader  h-[7rem] shadow-2xl z-1">
      <div className="navbar-start">
        <h1 className="text-white text-5xl px-2 md:p-7">{children}</h1>
      </div>
      <div className="navbar-center">
        {user ? null : (
          <div>
            <Link className="text-[#fbfbfb] text-xl mx-16 w-40" to="/">
              Portal de noticias
            </Link>
            <Link
              className="text-[#fbfbfb] text-xl mx-16 w-40"
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
            <button
              className="btn btn-ghost mx-4 text-white"
              onClick={() => logout()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div>
            <Link className="text-[#fbfbfb] mx-9 text-xl" to="/login">
              Iniciar Sesion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

/**
 * 
 * 
 <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>
 */
