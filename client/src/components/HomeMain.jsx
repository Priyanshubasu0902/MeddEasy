import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import appointment from "../assets/doctor-appointment.png";

const HomeMain = () => {
  const { view } = useContext(AppContext);

  return (
    <div className={`min-h-screen w-3/4 ${view ? "" : "w-full"} px-10 py-10`}>
      <h1 className="text-5xl font-bold md:text-5xl md:font-bold">
        My Health Record
      </h1>
      <div className="py-5">
        <div className="flex flex-col py-6 border-b border-gray-300">
          <h3 className="text-2xl font-bold">Patient Information</h3>
          <div className="flex gap-3 pt-2">
            <h5 className="font-semibold text-lg">Name:</h5>
            <span className="">Priyanshu Basu</span>
          </div>
          <div className="flex gap-3 pt-1">
            <h5 className="font-semibold text-lg">Age:</h5>
            <span>21</span>
          </div>
          <div className="flex gap-3 pt-1">
            <h5 className="font-semibold text-lg">Gender:</h5>
            <span>Male</span>
          </div>
        </div>
        <div className="border-b border-gray-300 py-6">
          <h3 className="text-2xl font-bold">Doctors</h3>
          <table className="mt-2">
            <thead>
              <tr>
                <th className="text-start py-1 pr-10">Name</th>
                <th className="text-start py-1 pr-10">Specialist</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start py-2 pr-10">Dr S. Singh</td>
                <td className="text-start py-2 pr-10">Heart</td>
              </tr>
              <tr className="">
                <td className="text-start py-2 pr-10">Dr S. Singh</td>
                <td className="text-start py-2 pr-10">Heart</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="py-5 ">
          <h3 className="text-2xl font-bold">Upcoming Appointments</h3>
          <div
            className={`flex items-center gap-5 p-2 mt-3 h-full ${
              view ? "w-2/3" : "w-2/5"
            } lg:w-1/4`}
          >
            <div className="bg-gray-200 w-1/5 h-full p-3 max-md:hidden flex rounded-xl items-center justify-center">
              <img className="h-8" src={appointment} alt="" />
            </div>
            <div>
              <p className="font-bold">July 15, 2025, 2:00 PM</p>
              <p className="text-gray-600 text-sm">Dr S. Singh, Cardiology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
