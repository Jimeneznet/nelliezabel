import React from "react";
import { useNavigation } from "react-router-dom";

const Header = ({ children }: any) => { //Este es un componente, arreglar la posicion en los <a>

  return ( //Todo dentro del return es lo que se va a desplegar en la pagina
    <div className="bg-secondaryHeader  h-[7rem] shadow-2xl z-1 flex flex-row justify-between">
      <h1 className="text-white text-5xl p-7">{children}</h1>
      <div className="flex items-center px-12">
        <a className="text-[#fbfbfb] mx-4" href="/login">Iniciar Sesion</a>
      </div>
    </div>
  );
};

export default Header;