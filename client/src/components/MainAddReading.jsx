import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const MainAddReading = () => {
  const { view } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen w-3/4 ${
        view ? "" : "w-4/4"
      } px-10 py-10 flex flex-col gap-6`}
    >
      <h1 className="text-5xl font-semibold">Add Readings</h1>
      <div>
        <h2 className="text-3xl font-semibold">Sugar Reading</h2>
        <form action="" className="flex flex-col gap-5 w-full p-5 border-b border-gray-300 pb-8">
          <label htmlFor="sugar" className="text-lg font-semibold">
            Sugar Reading (mg/dl)
            <br />
            <input
              className="w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
              type="number"
              id="sugar"
              placeholder="Enter Suger level"
            />
          </label>
          <label htmlFor="date" className="text-lg font-semibold">
            Date
            <br />
            <input
              className="appearance-none w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
              type="date"
              id="date"
              placeholder="Select date"
            />
          </label>
          <label htmlFor="time" className="text-lg font-semibold">
            Time
            <br />
            <input
              className="outline-none w-1/2 h-[50px] border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
              type="time"
              id="time"
              placeholder="Select Time"
            />
          </label>
          <button className="bg-blue-500 text-white h-[50px] w-[200px] rounded-3xl text-center" type="Submit">Add Sugar Reading</button>
        </form>
      </div>
      <div>
        <h2 className="text-3xl font-semibold">Pressure Reading</h2>
        <form action="" className="flex flex-col gap-5 w-full p-5">
          <label htmlFor="sugar" className="text-lg font-semibold">
            Pressure Reading (mmHg)
            <br />
            <input
              className="w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
              type="number"
              id="sugar"
              placeholder="Enter Pressure level"
            />
          </label>
          <label htmlFor="date" className="text-lg font-semibold">
            Date
            <br />
            <input
              className="appearance-none w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
              type="date"
              id="date"
              placeholder="Select date"
            />
          </label>
          <label htmlFor="time" className="text-lg font-semibold">
            Time
            <br />
            <input
              className="outline-none w-1/2 h-[50px] border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
              type="time"
              id="time"
              placeholder="Select Time"
            />
          </label>
          <button className="bg-blue-500 text-white h-[50px] w-[200px] rounded-3xl  text-center" type="Submit">Add Pressure Reading</button>
        </form>
      </div>
    </div>
  );
};

export default MainAddReading;
