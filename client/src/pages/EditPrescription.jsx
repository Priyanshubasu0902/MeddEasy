import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import EditPrescriptionMain from "../components/EditPrescriptionMain";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

const Prescriptions = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex'>
        <Dashboard section={"prescriptions"} />
        <EditPrescriptionMain/>
      </div>
    </div>
  );
};

export default Prescriptions;
