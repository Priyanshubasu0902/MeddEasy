import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const ReadingMain = () => {
  const { view } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen w-3/4 ${
        view ? "" : "w-full"
      } px-10 py-10 flex flex-col gap-5`}
    >
      <h1 className="text-6xl font-semibold ">Readings</h1>
      <p className="text-gray-500">View and manage your health readings</p>
      <div>
        <h3 className="text-xl font-bold">Filter</h3>
        <div className="flex gap-3 pt-2">
          <button className="bg-gray-300 max-lg:w-1/8 w-1/14 h-9 rounded-lg max-sm:text-sm cursor-pointer">
            Sugar
          </button>
          <button className="bg-gray-300 max-lg:w-1/8 w-1/14 h-9 rounded-lg max-sm:text-sm cursor-pointer">
            Pressure
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold">Sort</h3>
        <div className="flex pt-2 justify-between max-w-4xl">
          <button className="bg-gray-300 max-lg:w-1/8 text-sm w-1/10 h-9 max-sm:text-xs rounded-lg cursor-pointer">
            Date & Time
          </button>
          <button onClick={()=>navigate('/addReadings')} className="bg-gray-300 max-lg:w-1/8 w-1/10 h-9 max-sm:text-sm rounded-lg cursor-pointer">Add</button>
        </div>
      </div>
      <div>
        <table className="w-full max-w-4xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left">Reading Type</th>
              <th className="py-2 px-4 text-left">Value</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800">
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                Sugar
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                120 mg/dl
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                26-07-2024
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                08:00 AM
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                <div className="flex flex-col gap-3">
                  <button className="w-4/5 rounded-md h-7 bg-blue-300 cursor-pointer">Edit</button>
                  <button  className="w-4/5 h-7 rounded-md bg-red-300 cursor-pointer">Delete</button>
                </div>
              </td>
            </tr>
            <tr className="text-gray-800">
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                Pressure
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                120 mg/dl
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                26-07-2024
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                08:00 AM
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                <div className="flex flex-col gap-3">
                  <button className="w-4/5 rounded-md h-7 bg-blue-300 cursor-pointer">Edit</button>
                  <button  className="w-4/5 h-7 rounded-md bg-red-300 cursor-pointer">Delete</button>
                </div>
              </td>
            </tr>
            <tr className="text-gray-800">
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                Sugar
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                120 mg/dl
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                26-07-2024
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                08:00 AM
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
               <div className="flex flex-col gap-3">
                  <button className="w-4/5 rounded-md h-7 bg-blue-300 cursor-pointer">Edit</button>
                  <button  className="w-4/5 h-7 rounded-md bg-red-300 cursor-pointer">Delete</button>
                </div>
              </td>
            </tr>
            <tr className="text-gray-800">
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                Pressure
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                120 mg/dl
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                26-07-2024
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                08:00 AM
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                <div className="flex flex-col gap-3">
                  <button className="w-4/5 rounded-md h-7 bg-blue-300 cursor-pointer">Edit</button>
                  <button  className="w-4/5 h-7 rounded-md bg-red-300 cursor-pointer">Delete</button>
                </div>
              </td>
            </tr>
            <tr className="text-gray-800">
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                Sugar
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                120 mg/dl
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                26-07-2024
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                08:00 AM
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left">
                <div className="flex flex-col gap-3">
                  <button className="w-4/5 rounded-md h-7 bg-blue-300 cursor-pointer">Edit</button>
                  <button  className="w-4/5 h-7 rounded-md bg-red-300 cursor-pointer">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadingMain;
