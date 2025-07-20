import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const ReadingMain = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);
  const [filter , setFilter] = useState(false);
  const [sort, setSort] = useState(false)

  const fetchReadings = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/readings/getReadings",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setReadings(data.readings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteReading = async (id) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/readings/deleteReadings/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, [readings]);

  return (
    <div
    className={`min-h-screen w-4/5 ${view ? "max-md:relative max-md:w-full" : "w-full"} px-10 py-10 flex flex-col gap-5`}
    >
      <h1 className="text-6xl font-semibold ">Readings</h1>
      <p className="text-gray-500">View and manage your health readings</p>
      <div>
        <h3 className="text-xl font-bold">Filter</h3>
        <div className="flex gap-3 pt-2">
          <button onClick={()=>setFilter(false)} className={`${!filter?'bg-gray-100':'bg-gray-300'} px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}>
            All
          </button>
          <button onClick={()=>setFilter('sugar')} className={`${filter==='sugar'?'bg-gray-100':'bg-gray-300'} px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}>
            Sugar
          </button>
          <button onClick={()=>setFilter('pressure')} className={`${filter=='pressure'?'bg-gray-100':'bg-gray-300'} px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}>
            Pressure
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold">Sort</h3>
        <div className="flex pt-2 justify-between max-w-4xl">
          <button onClick={()=>setSort(!sort)} className={`${sort?'bg-gray-100':'bg-gray-300'} px-2 py-2 max-sm:text-xs rounded-lg cursor-pointer`}>
            Date & Time
          </button>
          <button
            onClick={() => navigate("/addReadings")}
            className="bg-gray-300 px-2 py-2 max-sm:text-sm rounded-lg cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold pb-2">Previous Records</h3>
        {readings.length > 0 ? (
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
              {readings.filter(filter?(a)=>a.type==filter:(a)=>a.type=='sugar'||a.type=='pressure').sort(sort?(a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`):()=>{}).map((a, index) => (
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
                  <td className="py-2 px-4 border-b border-gray-200 text-left">
                    <div className="flex flex-col gap-3">
                      <button onClick={()=>navigate(`/editReadings/${a._id}`)} className=" px-2 py-1 rounded-md bg-blue-300 cursor-pointer">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteReading(a._id);
                        }}
                        className=" px-2 py-1 rounded-md bg-red-300 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
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
  );
};

export default ReadingMain;
