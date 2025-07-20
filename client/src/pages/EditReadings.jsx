import Dashboard from "../components/Dashboard";
import EditReadingMain from "../components/EditReadingMain";
import Navbar from "../components/Navbar";

const EditReadings = () => {
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
