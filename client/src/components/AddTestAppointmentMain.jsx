import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import arrow from "../assets/arrow.png";
import { useNavigate } from "react-router-dom";

const AddTestAppointmentMain = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [labName, setLabName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState("not booked");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/testAppointments/addTestAppointment",
        { date, time, labName, purpose, status },
        { headers: { token: userToken } }
      );
      if (data.success) {
        setDate("");
        setTime("");
        setLabName("");
        setPurpose("");
        setStatus("not booked");
        setLoading(false);
        toast.success("Appointment added");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(data.message);
    }
  };

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-10 max-sm:px-6 py-10 mt-20`}
    >
      <img
        src={arrow}
        className="w-10 cursor-pointer lg:mb-5 mb-3"
        onClick={() => navigate("/testAppointment")}
        alt=""
      />
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-5xl max-md:text-3xl max-lg:text-4xl max-lg:pt-3 font-bold">
            Add Test Appointments
          </h1>
          <p className="text-gray-500 mt-2">Add your test appointments here</p>
        </div>

        <div className={`lg:w-2/7 w-full sm:w-2/3`}>
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex flex-col gap-6"
            action=""
          >
            <label className="flex flex-col gap-2" htmlFor="">
              <span className="text-xl font-semibold">Date</span>
              <input
                className="w-full lg:w-full h-12 border rounded-md p-3 bg-gray-100"
                type="Date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
              />
            </label>
            <label className="flex flex-col gap-2" htmlFor="">
              <span className="text-xl font-semibold">Time</span>
              <input
                className="w-full lg:w-full p-3 h-12 border rounded-md bg-gray-100"
                type="time"
                name=""
                id=""
                onChange={(e) => setTime(e.target.value)}
                value={time}
                required
              />
            </label>
            <label className="flex flex-col gap-2" htmlFor="">
              <span className="text-xl font-semibold">Lab Name</span>
                <input
                  className="w-full lg:w-full p-3 h-12 border rounded-md bg-gray-100"
                  placeholder="Enter Lab Name"
                  type="text"
                  onChange={(e) => setLabName(e.target.value)}
                  value={labName}
                  required
                />
            </label>
            <label className="flex flex-col gap-2" htmlFor="">
              <span className="text-xl font-semibold">Purpose of Visit</span>
              <textarea
                className="w-full p-2 lg:w-full h-50 resize-none border rounded-md bg-gray-100"
                type="text"
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
              />
            </label>
            <div className="flex gap-3">
              <div>
                <input
                  name="status"
                  checked={status === "booked"}
                  value="booked"
                  className="mr-1"
                  onChange={(e) => setStatus(e.target.value)}
                  type="radio"
                />
                <span className="text-xl font-semibold">Booked</span>
              </div>
              <div>
                <input
                  name="status"
                  checked={status === "visited"}
                  className="mr-1"
                  value="visited"
                  onChange={(e) => setStatus(e.target.value)}
                  type="radio"
                />
                <span className="text-xl font-semibold">Visited</span>
              </div>
              <div>
                <input
                  name="status"
                  checked={status === "not booked"}
                  className="mr-1"
                  value="not booked"
                  onChange={(e) => setStatus(e.target.value)}
                  type="radio"
                />
                <span className="text-xl font-semibold">Not Booked</span>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <input
                type="submit"
                value="Add"
                onClick={(e) => setStatus(status)}
                className="bg-[#814de5] font-semibold text-white px-4 py-2 font-semibold rounded-2xl cursor-pointer hover:bg-[#692be0]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loading dashboard={false}/>
  );
};

export default AddTestAppointmentMain;
