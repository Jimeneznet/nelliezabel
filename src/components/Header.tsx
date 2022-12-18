import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ children }: any) => {
  const navigate = useNavigate();

  return (
    <div className="bg-primaryHeader  h-[7rem] shadow-2xl z-1">
      <div onClick={() => navigate(`/`)} className=" text-white text-5xl p-7 hover:cursor-pointer">{children}</div>
    </div>
  );
};

export default Header;