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

const TestAppointmentMain = () => {
  const {view, backendUrl, userToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [testAppointments, setTestAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuView, setMenuView] = useState(false);
  const [menuViewType, setMenuViewType] = useState(false);
  const [upcomming, setUpcomming] = useState('todays');
  const [previous, setPrevious] = useState('visited');
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

  const fetchTestAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/testAppointments/getTestAppointments",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setTestAppointments(data.testAppointments);
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

  const deleteTestAppointment = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/testAppointments/deleteTestAppointment/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setMenuView(false);
        setMenuViewType(false);
        fetchTestAppointments();
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
    fetchTestAppointments();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } flex flex-col gap-8 px-10 max-sm:px-3 mt-20 py-10`}
      onClick={closeMenu}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl max-sm:text-2xl max-lg:pt-3 font-bold">
            Upcomming Test Appointments
          </h1>
          <button
            onClick={() => navigate("/addTestAppointments")}
            className="bg-[#814de5] text-white font-semibold px-2 py-2 mt-5 max-sm:text-sm rounded-lg cursor-pointer hover:bg-[#692be0]"
          >
            Add Appointment
          </button>
        </div>
        <div className="mt-3">
          <div className="my-3">
            <button onClick={()=>{
              setUpcomming('todays')
            }} className={`px-2 py-2 ${upcomming==='todays'?'bg-[#d6c5f7]':' bg-white'} cursor-pointer border-t border-l border-b border-gray-300`}>Todays</button>
            <button onClick={()=>{
              setUpcomming('future')
            }} className={`px-2 py-2 ${upcomming==='future'?'bg-[#d6c5f7]':'bg-white'} cursor-pointer border-t border-r border-b border-gray-300`}>Future</button>
          </div>
          <div>
            
          </div>
          { upcomming==='todays'? testAppointments.filter(
            (a) =>
              new Date(a.date).setHours(0, 0, 0, 0) ===
              new Date().setHours(0, 0, 0, 0)
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Lab</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {testAppointments
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
                        {a.labName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <button className={`w-23 h-9 ${a.status==='not booked'?'bg-[#BFA6F2]':a.status==='booked'?'bg-[#9d75eb]':a.status==='visited'?'bg-[#814de5]':''} text-white text-sm font-bold rounded-2xl cursor-pointer`}>
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
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-1 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editTestAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteTestAppointment(a._id)}
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
            <p className="text-xl lg:w-1/2 max-sm:text-lg text-gray-400 text-center">
              No Test Appointments Today
            </p>
          ):testAppointments.filter(
            (a) =>
              new Date(a.date).setHours(0, 0, 0, 0) >
              new Date().setHours(0, 0, 0, 0)
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Lab</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {testAppointments
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
                        {a.labName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 max-sm:px-2 border-b border-gray-200 text-left">
                        <button className={`w-23 h-9 ${a.status==='not booked'?'bg-[#BFA6F2]':a.status==='booked'?'bg-[#9d75eb]':a.status==='visited'?'bg-[#814de5]':''} text-white text-sm font-bold rounded-2xl cursor-pointer`}>
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
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-1 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editTestAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteTestAppointment(a._id)}
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
            <p className="text-xl lg:w-1/2 max-sm:text-lg text-gray-400 text-center">
              No Future Test Appointments
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-3xl max-sm:text-2xl max-lg:pt-3 font-bold">
          Previous Test Appointments
        </h3>
        <div className="mt-3">
          <div className="my-3">
            <button onClick={()=>{
              setPrevious('visited')
            }} className={`px-2 py-2 ${previous==='visited'?'bg-[#d6c5f7]':'bg-white'} cursor-pointer border-b border-t border-l border-gray-300`}>Visited</button>
            <button onClick={()=>{
              setPrevious('missed')
            }} className={`px-2 py-2 ${previous==='missed'?'bg-[#d6c5f7]':'bg-white'} cursor-pointer border-b border-t border-r border-gray-300`}>Missed</button>
          </div>
          { previous==='visited'?testAppointments.filter(
            (a) =>
              new Date(a.date) < new Date().setHours(0, 0, 0, 0) &&
              a.status === "visited"
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Lab</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {testAppointments
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
                        {a.labName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden  text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <button className={`w-23 h-9 ${a.status==='not booked'?'bg-[#BFA6F2]':a.status==='booked'?'bg-[#9d75eb]':a.status==='visited'?'bg-[#814de5]':''} text-white text-sm font-bold rounded-2xl cursor-pointer`}>
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
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-1 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editTestAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteTestAppointment(a._id)}
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
            <p className="text-xl lg:w-1/2 max-sm:text-lg text-gray-400 text-center">
              No Visited Test Appointments
            </p>
          ):testAppointments.filter(
            (a) =>
              new Date(a.date) < new Date().setHours(0, 0, 0, 0) &&
              a.status !== "visited"
          ).length > 0 ? (
            <table className="w-full max-w-6xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 lg:h-14">
                  <th className="py-2 px-4 max-sm:px-2 text-left">Date</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Time</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left">Lab</th>
                  <th className="py-2 px-4 max-sm:px-2 max-sm:hidden text-left">Purpose</th>
                  <th className="py-2 px-4 max-sm:px-2 text-left max-sm:text-center">Status</th>
                  <th className="py-2 px-4 max-sm:px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {testAppointments
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
                        {a.labName}
                      </td>
                      <td className="py-2 px-4 max-sm:px-2 border-b border-gray-200 max-sm:hidden text-left">
                        {a.purpose}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <button className={`w-23 h-9 ${a.status==='not booked'?'bg-[#BFA6F2]':a.status==='booked'?'bg-[#9d75eb]':a.status==='visited'?'bg-[#814de5]':''} text-white text-sm font-bold rounded-2xl cursor-pointer`}>
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
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-1 top-14"
                        >
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() =>
                              navigate(`/editTestAppointments/${a._id}`)
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="w-full py-2 px-4 max-sm:px-2 cursor-pointer border-b hover:bg-gray-300"
                            onClick={() => deleteTestAppointment(a._id)}
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
            <p className="text-xl lg:w-1/2 max-sm:text-lg text-gray-400 text-center">
              No Missed Test Appointments
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default TestAppointmentMain;
