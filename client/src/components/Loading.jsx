import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";


const Loading = ({dashboard}) => {
   const { view } = useContext(AppContext);
  return (
    <div className={`h-screen ${dashboard?'min-w-full z-5 fixed bg-white':''} ${view ? "max-md:relative w-full" : "w-full"} flex items-center justify-center`}>
      <div className="max-sm:w-20 max-sm:h-20 w-24 h-24 border-2 border-gray-300 border-t-6 border-t-violet-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
