import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditReadingMain = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  let [reading, setReading] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [upperPressure, setUpperPressure] = useState('');
  const [lowerPressure, setLowerPressure] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchReadingData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/readings/getReading/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        if (data.reading.type === "sugar") {
          setReading(data.reading.reading);
        } else if (data.reading.type === "pressure") {
          setUpperPressure(
            data.reading.reading.slice(0, data.reading.reading.indexOf("/"))
          );
          setLowerPressure(
            data.reading.reading.slice(
              data.reading.reading.indexOf("/") + 1,
              data.reading.reading.length
            )
          );
        }
        setDate(data.reading.date);
        setTime(data.reading.time);
        setType(data.reading.type);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (type === "pressure") {
        reading = `${upperPressure}/${lowerPressure}`;
      }
      const { data } = await axios.post(
        backendUrl + `/api/readings/editReading/${id}`,
        { reading, date, time, type },
        { headers: { token: userToken } }
      );
      if (data.success) {
        setReading("");
        setUpperPressure("");
        setLowerPressure("");
        setDate("");
        setTime("");
        setLoading(false);
        toast.success("Changes Updated");
        navigate("/readings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchReadingData();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-10 py-10 flex flex-col gap-6 max-md:mt-20`}
    >
      <h1 className="text-5xl font-semibold">Edit Readings</h1>
      <p className="text-gray-500">Edit your reading here</p>
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
              className="bg-[#814de5] font-semibold text-white h-[50px] w-[200px] rounded-3xl text-center cursor-pointer hover:bg-[#692be0]"
              type="Submit"
            >
              Save Changes
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
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  ) : (
    <Loading dashboard={false}/>
  );
};

export default EditReadingMain;
