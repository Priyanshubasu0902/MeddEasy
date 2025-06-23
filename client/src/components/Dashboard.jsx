import React, { useContext, useState } from "react";
import home from "../assets/home.png";
import appointment from "../assets/doctor-appointment.png";
import injection from "../assets/injection.png";
import report from "../assets/medical-result.png";
import prescription from "../assets/prescription.png";
import image from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Dashboard = ({ section }) => {
  const navigate = useNavigate();

  const { view } = useContext(AppContext);

  return (
    <>
      <div className={`min-h-screen w-2/6 inline-block ${view?'max-lg:w-2/5':'max-lg:hidden'} lg:w-1/5`}>
        <div className={`h-full flex flex-col gap-10 pt-8 p-5`}>
          <div className="flex px-3 py-2 gap-5 items-center">
            <img className="w-15 h-15 rounded-full" src={image} alt="" />
            <span className="font-medium text-2xl">Priyanshu Basu</span>
          </div>
          <ul className="flex flex-col gap-5">
            <li
              onClick={() => navigate("/")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "home" ? "bg-gray-200" : ""
              }  items-center w-full cursor-pointer`}
            >
              <img className="w-8" src={home} alt="" />
              <span className="text-xl font-medium">Home</span>
            </li>
            <li
              onClick={() => navigate("/appointment")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "appointment" ? "bg-gray-200" : ""
              }  items-center w-full cursor-pointer`}
            >
              <img className="w-8" src={appointment} alt="" />
              <span className="text-xl font-medium">Appointments</span>
            </li>
            <li
              onClick={() => navigate("/readings")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "readings" ? "bg-gray-200" : ""
              }  items-center w-full cursor-pointer`}
            >
              <img className="w-8" src={injection} alt="" />
              <span className="text-xl font-medium">Readings</span>
            </li>
            <li
              onClick={() => navigate("/prescriptions")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "prescriptions" ? "bg-gray-200" : ""
              }  items-center w-full cursor-pointer`}
            >
              <img className="w-8" src={prescription} alt="" />
              <span className="text-xl font-medium">Prescriptions</span>
            </li>
            <li
              onClick={() => navigate("/testresults")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "testresults" ? "bg-gray-200" : ""
              }  items-center w-full cursor-pointer`}
            >
              <img className="w-8" src={report} alt="" />
              <span className="text-xl font-medium">Test Results</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
