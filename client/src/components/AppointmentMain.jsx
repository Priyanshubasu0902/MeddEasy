import React, { useContext, useRef } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "./Loading";
import dot from "../assets/dots.png";

const AppointmentMain = () => {
  const {view, backendUrl, userToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuView, setMenuView] = useState(false);
  const [menuViewType, setMenuViewType] = useState(false);
  const today_menu = useRef(null);
  const upcomming_menu = useRef(null);
  const previous_menu = useRef(null);
  const missed_menu = useRef(null);

  const closeMenu = (e) => {
    if (e.target !== today_menu.current&&e.target !== upcomming_menu.current&&e.target !== previous_menu.current&&e.target !== missed_menu.current && menuView !== false && menuViewType !== false) {
      setMenuView(false);
      setMenuViewType(false);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/appointments/getAppointments",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
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

  const deleteAppointment = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/appointments/deleteAppointment/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setMenuView(false);
        setMenuViewType(false);
        fetchAppointments();
        setLoading(false);
        toast.success(data.message);
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
    fetchAppointments();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } flex flex-col gap-8 px-10 max-sm:px-3 max-md:mt-20 py-10`}
      onClick={closeMenu}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl max-md:text-3xl max-lg:text-3xl max-lg:pt-3 font-bold">
            Todays Appointments
          </h1>
          <button
            onClick={() => navigate("/addAppointments")}
            className="bg-[#814de5] text-white font-semibold px-2 py-2 mt-5 max-sm:text-sm rounded-lg cursor-pointer hover:bg-[#692be0]"
          >
            Add Appointment
          </button>
        </div>
        <div className="mt-3">
          {appointments.filter(
            (a) =>
              new Date(a.date).setHours(0, 0, 0, 0) ===
              new Date().setHours(0, 0, 0, 0)
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Doctor</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter(
                    (a) =>
                      new Date(a.date).setHours(0, 0, 0, 0) ===
                      new Date().setHours(0, 0, 0, 0)
                  )
                  .sort(
                    (a, b) =>
                      new Date(`${a.date}T${a.time}`) -
                      new Date(`${b.date}T${b.time}`)
                  )
                  .map((a, index) => (
                    <tr key={index} className="text-gray-800 lg:h-18">
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {moment(a.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.time}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.doctorName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                          {a.status}
                        </button>
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 flex justify-center text-left relative py-5">
                        <img
                          src={dot}
                          onClick={() =>
                            (menuView === false&&menuViewType === false) || menuView !== index
                              ? (setMenuView(index), setMenuViewType('today'))
                              : (setMenuView(false), setMenuViewType(false))
                          }
                          className="w-10 cursor-pointer"
                          alt=""
                        />
                         {menuView !== false && menuView === index && menuViewType==='today' ? (
                        <ul
                          ref={today_menu}
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-15 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteAppointment(a._id)}
                          >
                            Delete
                          </li>
                          <li className="w-full py-2 px-4 max-sm:px-2 cursor-pointer hover:bg-gray-300">
                            Update
                          </li>
                        </ul>
                         ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl text-gray-400 text-center">
              No appointments today
            </p>
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl max-md:text-3xl max-lg:text-3xl max-lg:pt-3 font-bold">
            Upcoming Appointments
          </h1>
        </div>
        <div className="mt-3">
          {appointments.filter(
            (a) =>
              new Date(a.date).setHours(0, 0, 0, 0) >
              new Date().setHours(0, 0, 0, 0)
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Doctor</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter(
                    (a) =>
                      new Date(a.date).setHours(0, 0, 0, 0) >
                      new Date().setHours(0, 0, 0, 0)
                  )
                  .sort(
                    (a, b) =>
                      new Date(`${a.date}T${a.time}`) -
                      new Date(`${b.date}T${b.time}`)
                  )
                  .map((a, index) => (
                    <tr key={index} className="text-gray-800 lg:h-18">
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {moment(a.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.time}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.doctorName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 max-sm:px-2 border-b border-gray-200 text-left">
                        <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                          {a.status}
                        </button>
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 flex text-left justify-center relative py-5">
                        <img
                          src={dot}
                          onClick={() =>
                           (menuView === false&&menuViewType === false) || menuView !== index 
                              ? (setMenuView(index), setMenuViewType('upcomming'))
                              : (setMenuView(false), setMenuViewType(false))
                          }
                          className="w-10 cursor-pointer"
                          alt=""
                        />
                         {menuView !== false && menuView === index && menuViewType === 'upcomming' ? (
                        <ul
                          ref={upcomming_menu}
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-15 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteAppointment(a._id)}
                          >
                            Delete
                          </li>
                          <li className="w-full py-2 px-4 max-sm:px-2 cursor-pointer hover:bg-gray-300">
                            Update
                          </li>
                        </ul>
                         ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl text-gray-400 text-center">
              No upcomming appointments
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-3xl max-md:text-3xl max-lg:text-3xl max-lg:pt-3 font-bold">
          Previous Appointments
        </h3>
        <div className="mt-3">
          {appointments.filter(
            (a) =>
              new Date(a.date) < new Date().setHours(0, 0, 0, 0) &&
              a.status === "visited"
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Doctor</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter(
                    (a) =>
                      new Date(a.date) < new Date().setHours(0, 0, 0, 0) &&
                      a.status === "visited"
                  )
                  .sort(
                    (a, b) =>
                      new Date(`${a.date}T${a.time}`) -
                      new Date(`${b.date}T${b.time}`)
                  )
                  .map((a, index) => (
                    <tr key={index} className="text-gray-800 lg:h-18">
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {moment(a.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.time}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.doctorName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden  text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                          {a.status}
                        </button>
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 flex text-left justify-center relative py-5">
                        <img
                          src={dot}
                          onClick={() =>
                            (menuView === false&&menuViewType === false) || menuView !== index
                              ? (setMenuView(index), setMenuViewType('previous'))
                              : (setMenuView(false), setMenuViewType(false))
                          }
                          className="w-10 cursor-pointer"
                          alt=""
                        />
                         {menuView !== false && menuView === index && menuViewType==='previous' ? (
                        <ul
                          ref={previous_menu}
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-15 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteAppointment(a._id)}
                          >
                            Delete
                          </li>
                          <li className="w-full py-2 px-4 max-sm:px-2 cursor-pointer hover:bg-gray-300">
                            Update
                          </li>
                        </ul>
                         ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl text-gray-400 text-center">
              No previous appointments
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-3xl max-md:text-3xl max-lg:text-3xl max-lg:pt-3 font-bold">
          Missed Appointments
        </h3>
        <div className="mt-3">
          {appointments.filter(
            (a) =>
              new Date(a.date) < new Date().setHours(0, 0, 0, 0) &&
              a.status !== "visited"
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Doctor</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter(
                    (a) =>
                      new Date(a.date) < new Date().setHours(0, 0, 0, 0) &&
                      a.status !== "visited"
                  )
                  .sort(
                    (a, b) =>
                      new Date(`${a.date}T${a.time}`) -
                      new Date(`${b.date}T${b.time}`)
                  )
                  .map((a, index) => (
                    <tr key={index} className="text-gray-800 lg:h-18">
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {moment(a.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.time}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 text-left">
                        {a.doctorName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <button className="w-23 h-9 bg-blue-100 text-sm font-bold rounded-2xl cursor-pointer">
                          {a.status}
                        </button>
                      </td>
                       <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 flex text-left justify-center relative py-5">
                        <img
                          src={dot}
                          onClick={() =>
                            (menuView === false&&menuViewType === false) || menuView !== index
                              ? (setMenuView(index), setMenuViewType('missed'))
                              : (setMenuView(false), setMenuViewType(false))
                          }
                          className="w-10 cursor-pointer"
                          alt=""
                        />
                         {menuView !== false && menuView === index && menuViewType==='missed' ? (
                        <ul
                          ref={missed_menu}
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-15 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteAppointment(a._id)}
                          >
                            Delete
                          </li>
                          <li className="w-full py-2 px-4 max-sm:px-2 cursor-pointer hover:bg-gray-300">
                            Update
                          </li>
                        </ul>
                         ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl text-gray-400 text-center">
              No missed appointments
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default AppointmentMain;
