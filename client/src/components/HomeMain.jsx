import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import appointment from "../assets/doctor-appointment.png";

const HomeMain = () => {
  const { view } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen w-3/4 ${
        view ? "" : "w-full"
      } px-10 py-10 bg-yellow-100`}
    >
      <h1 className="text-5xl font-bold md:text-5xl md:font-semibold">
        My Health Record
      </h1>
      <div className="flex flex-col py-5">
        <h3 className="text-xl font-bold">Patient Information</h3>
        <div className="flex gap-3">
          <h5 className="">Name:</h5>
          <span className="">Priyanshu Basu</span>
        </div>
        <div className="flex gap-3">
          <h5 className="">Age:</h5>
          <span>21</span>
        </div>

        <div className="flex gap-3">
          <h5>Gender:</h5>
          <span>Male</span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold">Doctors</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialist</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr S. Singh</td>
              <td>Heart</td>
            </tr>
            <tr>
              <td>Dr S. Singh</td>
              <td>Heart</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-5 ">
        <h3 className="text-xl font-bold">Upcoming Appointments</h3>
        <div
          className={`flex items-center gap-5 p-2 h-full ${
            view ? "w-2/3" : "w-2/5"
          } lg:w-1/4 bg-red-100`}
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
  );
};

export default HomeMain;
