import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import EditPrescriptionMain from "../components/EditPrescriptionMain";

const Prescriptions = () => {
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
