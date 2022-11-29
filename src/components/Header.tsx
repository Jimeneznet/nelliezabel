import React from "react";



const Header = ({ children }: any) => {
  return (
    <div className="bg-secondaryHeader  h-[7rem] shadow-2xl z-1">
      <h1 className="text-white  text-5xl p-7">{children}</h1>
    </div>
  );
};

export default Header;