import { useContext, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import EditReadingMain from "../components/EditReadingMain";
import Navbar from "../components/Navbar";
import { AppContext } from "../Context/AppContext";

const EditReadings = () => {

    const {setView} = useContext(AppContext)
  
    useEffect(()=>setView(false),[])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className='flex'>
        <Dashboard section="readings" />
        <EditReadingMain/>
      </div>
    </div>
  );
};

export default EditReadings;
