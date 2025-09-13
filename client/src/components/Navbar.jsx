import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import menus from "../assets/menus.png";

const Navbar = () => {
  const { view, setView } = useContext(AppContext);

  const toggle = () => {
    view ? setView(false) : setView(true);
  };

  return (
    <div className="p-5 w-full bg-[#814de5] cursor-pointer fixed z-2 h-20 flex items-center">
      <img
        onClick={() => {
          toggle();
        }}
        className="w-10 lg:hidden"
        src={menus}
        alt=""
      />
      <h1 className="text-white text-3xl font-semibold mx-auto">MeddEasy</h1>
    </div>
  );
};

export default Navbar;
