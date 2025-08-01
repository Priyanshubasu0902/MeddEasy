import React, { useContext, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import PrescriptionMain from "../components/PrescriptionMain";
import { AppContext } from "../Context/AppContext";

const Prescriptions = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={"prescriptions"} />
        <PrescriptionMain/>
      </div>
    </div>
  );
};

export default Prescriptions;
