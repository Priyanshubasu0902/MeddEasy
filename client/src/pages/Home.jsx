import Dashboard from "../components/Dashboard";
import HomeMain from "../components/HomeMain";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-1/2">
        <Dashboard section="home" />
        <HomeMain />
      </div>
    </div>
  );
};

export default Home;
