import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AddAppointmentMain = () => {
  const { view } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen w-3/4 ${
        view ? "" : "w-full"
      } px-10 py-10 flex flex-col gap-8`}
    >
      <h1 className="text-5xl max-md:text-3xl max-lg:text-4xl max-lg:pt-3 font-bold">
        Add Appointments
      </h1>
      <div className={`lg:w-2/7 ${view ? "w-3/4" : "w-1/2 "}`}>
        <form className="flex flex-col gap-6" action="">
          <label className="flex flex-col gap-2" htmlFor="">
            <span className="text-xl font-semibold">Date</span>
            <input
              className="w-full lg:w-full h-12 border rounded-md pl-3 bg-gray-100"
              type="Date"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="">
            <span className="text-xl font-semibold">Time</span>
            <input
              className="w-full lg:w-full h-12 border rounded-md bg-gray-100"
              type="time"
              name=""
              id=""
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="">
            <span className="text-xl font-semibold">Doctor Name</span>
            <input
              className="w-full lg:w-full h-12 border rounded-md pl-3  bg-gray-100"
              placeholder="Enter Doctor Name"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="">
            <span className="text-xl font-semibold">Purpose of Visit</span>
            <textarea
              className="w-full lg:w-full h-50 resize-none border rounded-md bg-gray-100"
              type="text"
            />
          </label>
          <div className="flex gap-3">
            <div>
              <input name="status" className="mr-1" type="radio" />
              <span className="text-xl font-semibold">Booked</span>
            </div>
            <div>
              <input name="status" className="mr-1" type="radio" />
              <span className="text-xl font-semibold">Visited</span>
            </div>
            <div>
              <input name="status" className="mr-1" type="radio" />
              <span className="text-xl font-semibold">Not Booked</span>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <input
              type="submit"
              value="Add"
              className="bg-blue-300 h-10 w-1/5 font-semibold rounded-3xl cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentMain;
