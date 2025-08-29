import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "./Loading";
import dot from "../assets/dots.png";

const ReadingMain = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuView, setMenuView] = useState(false);
  const menu = useRef(null);

  const closeMenu = (e) => {
    if (e.target !== menu.current && menuView !== false) {
      setMenuView(false);
    }
  };

  const fetchReadings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/readings/getReadings",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        setReadings(data.readings);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const deleteReading = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/readings/deleteReadings/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        setMenuView(false);
        toast.success(data.message);
        fetchReadings();
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
    fetchReadings();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-10 py-10 flex flex-col gap-5`}
       onClick={closeMenu}
    >
      <h1 className="text-6xl font-semibold ">Readings</h1>
      <p className="text-gray-500">View and manage your health readings</p>
      <div>
        <h3 className="text-xl font-bold">Filter</h3>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setFilter(false)}
            className={`${
              !filter
                ? "bg-[#9d75eb] text-white font-semibold"
                : "bg-[#d6c5f7] "
            } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("sugar")}
            className={`${
              filter === "sugar"
                ? "bg-[#9d75eb] text-white font-semibold"
                : "bg-[#d6c5f7]"
            } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
          >
            Sugar
          </button>
          <button
            onClick={() => setFilter("pressure")}
            className={`${
              filter == "pressure"
                ? "bg-[#9d75eb] text-white font-semibold"
                : "bg-[#d6c5f7]"
            } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
          >
            Pressure
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold">Sort</h3>
        <div className="flex pt-2 justify-between max-w-4xl">
          <button
            onClick={() => setSort(!sort)}
            className={`${
              sort ? "bg-[#9d75eb] text-white font-semibold" : "bg-[#d6c5f7]"
            } px-2 py-2 max-sm:text-xs rounded-lg cursor-pointer`}
          >
            Date & Time
          </button>
          <button
            onClick={() => navigate("/addReadings")}
            className="bg-[#814de5] font-semibold text-white px-2 py-2 max-sm:text-sm rounded-lg cursor-pointer hover:bg-[#692be0]"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold pb-2">Previous Records</h3>
        {readings.filter(
          filter
            ? (a) => a.type == filter
            : (a) => a.type == "sugar" || a.type == "pressure"
        ).length > 0 ? (
          <table className="w-full max-w-4xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Reading Type</th>
                <th className="py-2 px-4 text-left">Value</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {readings
                .filter(
                  filter
                    ? (a) => a.type == filter
                    : (a) => a.type == "sugar" || a.type == "pressure"
                )
                .sort(
                  sort
                    ? (a, b) =>
                        new Date(`${a.date}T${a.time}`) -
                        new Date(`${b.date}T${b.time}`)
                    : () => {}
                )
                .map((a, index) => (
                  <tr key={index} className="text-gray-800">
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {a.type}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {a.reading} {a.type == "sugar" ? "mg/dl" : "mmHg"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {moment(a.date).format("DD-MM-YYYY")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {a.time}
                    </td>
                    <td className="py-2 px-4 border-b flex justify-center border-gray-200 text-left relative py-5">
                      <img
                        src={dot}
                        onClick={() =>
                          menuView === false || menuView !== index
                            ? setMenuView(index)
                            : setMenuView(false)
                        }
                        className="w-10 cursor-pointer"
                        alt=""
                      />
                      {menuView !== false && menuView === index ? (
                        <ul
                          ref={menu}
                          className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-15 top-14"
                        >
                          <li
                            onClick={() => navigate(`/editReadings/${a._id}`)}
                           className="w-full p-2 px-3 cursor-pointer border-b hover:bg-gray-300"
                          >
                            Edit
                          </li>
                          <li
                            onClick={() => {
                              deleteReading(a._id);
                            }}
                            className="w-full p-2 px-3 cursor-pointer hover:bg-gray-300"
                          >
                            Delete
                          </li>
                        </ul>
                      ) : null}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-xl text-gray-400 text-center">No Record</p>
        )}
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default ReadingMain;
