import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditAppointmentMain = () => {
  const { view, backendUrl, userToken, doctors } = useContext(AppContext);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + `/api/appointments/editAppointment/${id}`,
        { date, time, doctorName, purpose, status },
        { headers: { token: userToken } }
      );
      if (data.success) {
        setDate("");
        setTime("");
        setDoctorName("");
        setPurpose("");
        setStatus("");
        setQuery("");
        setFilteredItems([]);
        setLoading(false);
        toast.success(data.message);
        navigate("/appointment");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(data.message);
    }
  };

  const fetchAppointment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/appointments/getAppointment/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setDate(data.appointment.date);
        setTime(data.appointment.time);
        setPurpose(data.appointment.purpose);
        setDoctorName(data.appointment.doctorName);
        setQuery(data.appointment.doctorName);
        setStatus(data.appointment.status);
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

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    if (query !== ""&&doctorName==='') {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
    if (query !== doctorName) {
      setDoctorName('');
    }
  }, [query]);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-10 py-10 max-sm:px-6 flex flex-col gap-8 max-lg:gap-3 max-md:mt-20`}
    >
      <h1 className="text-5xl max-md:text-3xl max-lg:text-4xl max-lg:pt-3 font-bold">
        Edit Appointment
      </h1>
      <p className="text-gray-500">Edit your appointment here</p>

      <div className={`lg:w-2/7 w-full sm:w-2/3 pt-2`}>
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
            <span className="text-xl font-semibold">Doctor Name</span>
            <div>
              <input
                className="w-full lg:w-full h-12 border rounded-md p-3  bg-gray-100"
                placeholder="Enter Doctor Name"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                required
              />
              <ul
                className={`w-2/3 shadow-lg bg-gray-200 mt-1 ${
                  filteredItems.length === 0 ? "" : "border border-gray-600"
                }`}
              >
                {filteredItems.map((doctor, index) => (
                  <li
                    className="px-3 py-2 hover:bg-gray-300 font-bold"
                    onClick={() => {
                      setDoctorName(doctor.name);
                      setQuery(doctor.name);
                      setFilteredItems([]);
                    }}
                    key={index}
                  >
                    {doctor.name}
                  </li>
                ))}
                {query !== "" && !doctorName && (
                  <li
                    onClick={() => navigate("/home")}
                    className="px-3 py-2 hover:bg-gray-300 font-bold"
                  >
                    Add More Doctor
                  </li>
                )}
              </ul>
            </div>
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
              value="Save Changes"
              className="bg-[#814de5] font-semibold text-white px-4 py-2 font-semibold rounded-2xl cursor-pointer hover:bg-[#692be0]"
            />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loading dashboard={false}/>
  );
};

export default EditAppointmentMain;
