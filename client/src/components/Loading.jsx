import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";


const Loading = ({dashboard}) => {
   const { view } = useContext(AppContext);
  return (
    <div className={`min-h-screen ${dashboard?'min-w-full absolute bg-white':''} ${view ? "max-md:relative w-full" : "w-full"} flex items-center justify-center`}>
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-violet-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
