import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AppointmentMain = () => {
  const { view } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen w-3/4 ${
        view ? "" : "w-full"
      } px-10 py-10 flex flex-col gap-8`}
    >
      <div className="w-full">
        <div className="flex justify-between lg:w-4/5">
          <h1 className="text-5xl max-md:text-3xl max-lg:text-4xl max-lg:pt-3 font-bold">
            Upcoming Appointments
          </h1>
          <button
            onClick={() => navigate("/addAppointments")}
            className="bg-gray-300 max-lg:w-1/5 max-md:w-1/4 w-1/8 h-10 mt-5 max-sm:text-sm rounded-lg cursor-pointer"
          >
            Add Appointment
          </button>
        </div>
        <div className="mt-3">
          <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 lg:h-14">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Doctor</th>
                <th className="py-2 px-4 text-left">Purpose</th>
                <th className="py-2 px-4 max-sm:hidden text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800 lg:h-18">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 15, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Health checkup
                </td>
                <td className="py-2 px-3 border-b border-gray-200  max-sm:hidden text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex max-lg:flex-col gap-1">
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Edit
                    </a>
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Delete
                    </a>
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Update
                    </a>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800 lg:h-18">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  August 12, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Heart Checkup
                </td>
                <td className="py-2 px-3 border-b border-gray-200 max-sm:hidden text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex max-lg:flex-col gap-1">
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Edit
                    </a>
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Delete
                    </a>
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Update
                    </a>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800 lg:h-18">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  September 24, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Eye checkup
                </td>
                <td className="py-2 px-3 border-b max-sm:hidden border-gray-200 text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex max-lg:flex-col gap-1">
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Edit
                    </a>
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Delete
                    </a>
                    <a
                      className="lg:border-r lg:border-gray-500 hover:text-blue-800 pr-1 font-semibold text-gray-500"
                      href=""
                    >
                      Update
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="text-3xl max-md:text-3xl max-lg:text-3xl max-lg:pt-3 font-bold">Previous Appointments</h3>
        <div className="mt-3">
          <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 lg:h-14">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Doctor</th>
                <th className="py-2 px-4 text-left">Purpose</th>
                <th className="py-2 px-4 max-sm:hidden text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800 h-19">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 15, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Health checkup
                </td>
                <td className="py-2 px-3 border-b border-gray-200  max-sm:hidden text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
              </tr>
              <tr className="text-gray-800 h-19">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  August 12, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Heart Checkup
                </td>
                <td className="py-2 px-3 border-b border-gray-200 max-sm:hidden text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
              </tr>
              <tr className="text-gray-800 h-19">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  September 24, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Eye checkup
                </td>
                <td className="py-2 px-3 border-b max-sm:hidden border-gray-200 text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
              </tr>
              <tr className="text-gray-800 h-19">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  September 24, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Eye checkup
                </td>
                <td className="py-2 px-3 border-b max-sm:hidden border-gray-200 text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
              </tr>
              <tr className="text-gray-800 h-19">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  September 24, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Eye checkup
                </td>
                <td className="py-2 px-3 border-b max-sm:hidden border-gray-200 text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
              </tr>
              <tr className="text-gray-800 h-19">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  September 24, 2024
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  10:30 A.M
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Dr Akash Roy
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Eye checkup
                </td>
                <td className="py-2 px-3 border-b max-sm:hidden border-gray-200 text-left">
                  <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                    Booked
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentMain;
