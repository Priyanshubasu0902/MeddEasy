import React, { useContext, useState } from "react";
import home from "../assets/home.png";
import appointment from "../assets/doctor-appointment.png";
import report from "../assets/medical-result.png";
import prescription from "../assets/prescription.png";
import stethoscope from "../assets/stethoscope.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import person_icon from "../assets/person_icon.svg";
import injection from "../assets/syringe.png";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";

const Dashboard = ({ section }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { view, userData, userToken, backendUrl, setUserToken, setUserData } =
    useContext(AppContext);

  const logout = () => {
    setUserToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/users/deleteUser", {
        headers: { token: userToken },
      });
      if (data.success) {
        setUserToken(null);
        setUserData(null);
        localStorage.removeItem("token");
        setLoading(false);
        toast.success(data.message);
        navigate("/");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return !loading ? (
    <>
      <div
        className={`text-white bg-[#814de5] ${
          view ? "md:w-2/5 max-md:fixed z-2" : "max-lg:hidden"
        } lg:w-1/5 min-h-screen mt-20`}
      >
        <div className={`flex flex-col gap-10 pt-8 p-5`}>
          <div className="flex px-3 py-2 gap-5 items-center">
            <img
              className="w-16 h-16 rounded-full border border-gray-300 object-contain"
              src={userData.image ? userData.image : person_icon}
              alt=""
            />
            <span className="font-medium text-2xl">{userData.name}</span>
          </div>
          <div className="w-full gap-6 px-3 flex">
            <button
              onClick={deleteUser}
              className="w-1/2 font-bold rounded-lg border-white border-3 hover:text-[#692be0] hover:bg-white px-1 py-1 cursor-pointer"
            >
              Delete Account
            </button>
            <button
              onClick={logout}
              className="w-1/2 font-bold rounded-lg border-white border-3 hover:text-[#692be0] hover:bg-white px-1 py-1 cursor-pointer"
            >
              Logout
            </button>
          </div>
          <ul className="flex flex-col gap-5">
            <li
              onClick={() => navigate("/home")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "home" ? "bg-[#692be0]" : "hover:bg-[#9d75eb]"
              }  items-center w-full cursor-pointer`}
            >
              <img className="w-8" src={home} alt="" />
              <span className="text-xl font-medium">Home</span>
            </li>
            <li
              onClick={() => navigate("/appointment")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "appointment" ? "bg-[#692be0]" : "hover:bg-[#9d75eb]"
              }  items-center w-full cursor-pointer `}
            >
              <img className="w-8" src={appointment} alt="" />
              <span className="text-xl font-medium">Appointments</span>
            </li>
             <li
              onClick={() => navigate("/testAppointment")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "testAppointment" ? "bg-[#692be0]" : "hover:bg-[#9d75eb]"
              }  items-center w-full cursor-pointer `}
            >
              <img className="w-8" src={injection} alt="" />
              <span className="text-xl font-medium">Test Appointments</span>
            </li>
            <li
              onClick={() => navigate("/readings")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "readings" ? "bg-[#692be0]" : "hover:bg-[#9d75eb]"
              }  items-center w-full cursor-pointer `}
            >
              <img className="w-8" src={stethoscope} alt="" />
              <span className="text-xl font-medium">Readings</span>
            </li>
            <li
              onClick={() => navigate("/prescriptions")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "prescriptions" ? "bg-[#692be0]" : "hover:bg-[#9d75eb]"
              }  items-center w-full cursor-pointer `}
            >
              <img className="w-8" src={prescription} alt="" />
              <span className="text-xl font-medium">Prescriptions</span>
            </li>
            <li
              onClick={() => navigate("/testResults")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "testresults" ? "bg-[#692be0]" : "hover:bg-[#9d75eb]"
              }  items-center w-full cursor-pointer `}
            >
              <img className="w-8" src={report} alt="" />
              <span className="text-xl font-medium">Test Results</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  ) : (
    <Loading dashboard={true}/>
  );
};

export default Dashboard;
