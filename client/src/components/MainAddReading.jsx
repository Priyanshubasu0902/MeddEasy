import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import arrow from "../assets/arrow.png";
import { useNavigate } from "react-router-dom";

const MainAddReading = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  let [reading, setReading] = useState(null);
  const [upperPressure, setUpperPressure] = useState(null);
  const [lowerPressure, setLowerPressure] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [type, setType] = useState("sugar");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (type === "pressure") {
        reading = `${upperPressure}/${lowerPressure}`;
      }
      const { data } = await axios.post(
        backendUrl + "/api/readings/addReadings",
        { reading, upperPressure, lowerPressure, date, time, type },
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        toast.success("Reading added");
        setReading("");
        setUpperPressure("");
        setLowerPressure("");
        setDate("");
        setTime("");
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
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-10 py-10`}
    >
      <img
        src={arrow}
        className="w-10 cursor-pointer lg:mb-5 mb-3"
        onClick={() => navigate("/readings")}
        alt=""
      />

      <div className=" flex flex-col gap-6">
        <div>
          <h1 className="text-5xl font-semibold mb-3">Add Readings</h1>
          <p className="text-gray-500">Add your readings here</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setType("sugar");
              setReading("");
              setDate("");
              setTime("");
              setLowerPressure("");
              setUpperPressure("");
            }}
            className={`${
              type == "sugar"
                ? "bg-[#9d75eb] text-white font-semibold"
                : "bg-[#d6c5f7]"
            } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
          >
            Sugar
          </button>
          <button
            onClick={() => {
              setType("pressure");
              setReading("");
              setDate("");
              setTime("");
            }}
            className={`${
              type == "pressure"
                ? "bg-[#9d75eb] text-white font-semibold"
                : "bg-[#d6c5f7]"
            } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
          >
            Pressure
          </button>
        </div>
        {type == "sugar" ? (
          <div>
            <h2 className="text-3xl font-semibold">Sugar Reading</h2>
            <form
              onSubmit={(e) => onSubmitHandler(e)}
              className="flex flex-col gap-5 w-full p-5 pb-8"
            >
              <label htmlFor="sugar" className="text-lg font-semibold">
                Sugar Reading (mg/dl)
                <br />
                <input
                  className="w-1/2 max-sm:w-full mt-1 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                  type="number"
                  id="sugar"
                  placeholder="Enter Suger level"
                  onChange={(e) => setReading(e.target.value)}
                  value={reading}
                  required
                />
              </label>
              <label htmlFor="date" className="text-lg font-semibold">
                Date
                <br />
                <input
                  className="appearance-none max-sm:w-full mt-1 w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                  type="date"
                  id="date"
                  placeholder="Select date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                />
              </label>
              <label htmlFor="time" className="text-lg font-semibold">
                Time
                <br />
                <input
                  className="outline-none max-sm:w-full mt-1 w-1/2 h-[50px] border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                  type="time"
                  id="time"
                  placeholder="Select Time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  required
                />
              </label>
              <button
                className="bg-[#814de5] font-semibold text-white h-[50px] w-[200px] rounded-3xl cursor-pointer text-center hover:bg-[#692be0]"
                type="Submit"
              >
                Add Sugar Reading
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold">Pressure Reading</h2>
            <form
              onSubmit={(e) => onSubmitHandler(e)}
              className="flex flex-col gap-5 w-full p-5"
            >
              <label htmlFor="pressure" className="text-lg font-semibold">
                Pressure Reading (mmHg)
                <br />
                <div className="w-1/2 flex items-center max-sm:w-full mt-2 h-[50px] gap-1">
                  <input
                    className="w-1/2 h-full outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                    type="number"
                    id="pressure"
                    placeholder="Upper"
                    onChange={(e) => setUpperPressure(e.target.value)}
                    value={upperPressure}
                    required
                  />
                  <span className="text-4xl font-normal">/</span>
                  <input
                    className="w-1/2 h-full outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                    type="number"
                    id="pressure"
                    placeholder="Lower"
                    onChange={(e) => setLowerPressure(e.target.value)}
                    value={lowerPressure}
                    required
                  />
                </div>
              </label>
              <label htmlFor="date" className="text-lg font-semibold">
                Date
                <br />
                <input
                  className="appearance-none max-sm:w-full mt-1 w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                  type="date"
                  id="date"
                  placeholder="Select date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                />
              </label>
              <label htmlFor="time" className="text-lg font-semibold">
                Time
                <br />
                <input
                  className="outline-none max-sm:w-full mt-1 w-1/2 h-[50px] border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                  type="time"
                  id="time"
                  placeholder="Select Time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  required
                />
              </label>
              <button
                className="bg-[#814de5] font-semibold text-white h-[50px] w-[200px] rounded-3xl cursor-pointer text-center hover:bg-[#692be0]"
                type="Submit"
              >
                Add Pressure Reading
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MainAddReading;
