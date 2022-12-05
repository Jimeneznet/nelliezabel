import React from 'react';


import Datalist from './Datalist';


const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header className="header">
      <h1>EDITOR DE PALABRAS DEL DICCIONARIO</h1>
      <div >
        <button onClick={() => setIsAdding(true)}>Añadir Palabra</button>

        <Datalist/>
      </div>
    </header>
  );
};

export default Header;
