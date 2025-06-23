import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import PrescriptionMain from "../components/PrescriptionMain";

const Prescriptions = () => {
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
