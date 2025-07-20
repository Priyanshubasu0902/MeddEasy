import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditAppointmentMain = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [doctorName, setDoctorName] = useState();
  const [purpose, setPurpose] = useState();
  const [status, setStatus] = useState();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async(e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl+`/api/appointments/editAppointment/${id}`, {date,time,doctorName,purpose,status}, {headers:{token:userToken}})
      if(data.success) {
        setLoading(false)
        toast.success(data.message)
        setDate('')
        setTime('')
        setDoctorName('')
        setPurpose('')
        setStatus('')
        navigate('/appointment')
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(data.message)
    }
  }

  const fetchAppointment = async() => {
   try {
      const {data} = await axios.get(backendUrl+`/api/appointments/getAppointment/${id}`, {headers:{token:userToken}})
      if(data.success) {
         setDate(data.appointment.date)
         setTime(data.appointment.time)
         setPurpose(data.appointment.purpose)
         setDoctorName(data.appointment.doctorName)
         setStatus(data.appointment.status)
      }
      else{
         toast.error(data.message)
      }

   } catch (error) {
      toast.error(error.message)
   }
  } 

  useEffect(()=>{fetchAppointment()},[])

  return !loading? (
    <div className={`min-h-screen w-4/5 ${view ? "max-md:relative max-md:w-full" : "w-full"} px-10 py-10 flex flex-col gap-8`}
    >
      <h1 className="text-5xl max-md:text-3xl max-lg:text-4xl max-lg:pt-3 font-bold">
        Edit Appointment
      </h1>
      <p className="text-gray-500">Edit your appointment here</p>

      <div className={`lg:w-2/7 w-full`}>
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
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="">
            <span className="text-xl font-semibold">Doctor Name</span>
            <input
              className="w-full lg:w-full h-12 border rounded-md p-3  bg-gray-100"
              placeholder="Enter Doctor Name"
              type="text"
              onChange={(e) => setDoctorName(e.target.value)}
              value={doctorName}
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
              value="Save Changes"
              className="bg-blue-300 px-4 py-2 font-semibold rounded-2xl cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  ):<Loading/>;
};

export default EditAppointmentMain;
