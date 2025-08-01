import React, { useContext, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import ReadingMain from "../components/ReadingMain";
import Navbar from "../components/Navbar";
import { AppContext } from "../Context/AppContext";

const Readings = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className='flex'>
        <Dashboard section="readings" />
        <ReadingMain />
      </div>
    </div>
  );
};

export default Readings;
