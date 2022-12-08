import React from 'react';


import Datalist from './Datalist';


const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header className="header">
      <div className='flex'>       
        <div className='flex-1 w-16'>
          <Datalist/>
        </div>

        <div className='text-end flex-1 w-32'>
          <button className=' mt-5 border-secondaryHeader bg-secondaryHeader hover:bg-primaryHeader hover:border-primaryHeader' onClick={() => setIsAdding(true)}>Agregar palabra</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
