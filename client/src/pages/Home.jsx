import { useContext, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import HomeMain from "../components/HomeMain";
import Navbar from "../components/Navbar";
import { AppContext } from "../Context/AppContext";

const Home = () => {

  const {setView} = useContext(AppContext)

  useEffect(()=>setView(false),[])

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <Dashboard section="home" />
        <HomeMain />
      </div>
    </div>
  );
};

export default Home;
