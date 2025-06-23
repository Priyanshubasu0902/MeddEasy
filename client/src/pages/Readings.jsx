import React from "react";
import Dashboard from "../components/Dashboard";
import ReadingMain from "../components/ReadingMain";
import Navbar from "../components/Navbar";

const Readings = () => {
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
