import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import appointment from "../assets/doctor-appointment.png";
import injection from "../assets/syringe.png";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.png";
import { toast } from "react-toastify";
import Loading from "./Loading";
import dot from "../assets/dots.png";

const HomeMain = () => {
  const {
    view,
    userData,
    fetchUserData,
    userToken,
    backendUrl,
    doctors,
    fetchDoctors,
  } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [testAppointments, setTestAppointments] = useState([]);

  const [doctorName, setDoctorName] = useState("");
  const [doctorSpeciality, setDoctorSpeciality] = useState("");
  const [doctorNumber, setDoctorNumber] = useState("");

  const [editDoctorName, setEditDoctorName] = useState("");
  const [editDoctorSpeciality, setEditDoctorSpeciality] = useState("");
  const [editDoctorNumber, setEditDoctorNumber] = useState("");

  const [detailEdit, setDetailEdit] = useState(false);

  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);

  const [loading, setLoading] = useState(false);
  const [editDoctor, setEditDoctor] = useState(false);

  const [menuView, setMenuView] = useState(false);
  const menu = useRef(null);

  const navigate = useNavigate();

  const closeMenu = (e) => {
    if (e.target !== menu.current && menuView !== false) {
      setMenuView(false);
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

  const doctorSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctors/addDoctor",
        {
          name: doctorName,
          speciality: doctorSpeciality,
          number: doctorNumber,
        },
        { headers: { token: userToken } }
      );
      if (data.success) {
        fetchDoctors();
        setMenuView(false);
        setDoctorName("");
        setDoctorSpeciality("");
        setDoctorNumber("");
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

  const detailOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/users/editDetails",
        { name, age, gender },
        { headers: { token: userToken } }
      );
      if (data.success) {
        fetchUserData();
        setMenuView(false);
        setDetailEdit(false);
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

  const deleteDoctor = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/doctors/deleteDoctor/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setMenuView(false);
        fetchDoctors();
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

  const editDoctorHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + `/api/doctors/editDoctor/${editDoctor}`,
        {
          name: editDoctorName,
          speciality: editDoctorSpeciality,
          number: editDoctorNumber,
        },
        { headers: { token: userToken } }
      );
      if (data.success) {
        setEditDoctor(false);
        setEditDoctorName("");
        setEditDoctorSpeciality("");
        setEditDoctorNumber("");
        fetchDoctors();
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
    fetchTestAppointments();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-8 max-sm:px-3 py-10 mt-20`}
      onClick={closeMenu}
    >
      <h1 className="text-5xl max-sm:text-4xl font-bold">My Health Record</h1>
      <div className="py-5 max-sm:py-2">
        <div className="flex flex-col py-6 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Patient Information</h3>
            <img
              className="w-6 h-6 cursor-pointer"
              onClick={() => setDetailEdit(!detailEdit)}
              src={editIcon}
              alt=""
            />
          </div>
          {!detailEdit ? (
            <>
              <div className="flex gap-3 pt-2">
                <h5 className="font-semibold text-lg">Name:</h5>
                <span className="">{userData.name}</span>
              </div>
              <div className="flex gap-3 pt-1">
                <h5 className="font-semibold text-lg">Age:</h5>
                <span>{userData.age}</span>
              </div>
              <div className="flex gap-3 pt-1">
                <h5 className="font-semibold text-lg">Gender:</h5>
                <span>{userData.gender}</span>
              </div>
            </>
          ) : (
            <>
              <form
                onSubmit={(e) => detailOnSubmit(e)}
                className="flex flex-col"
                action=""
              >
                <label className="flex gap-3 pt-3" htmlFor="">
                  <span className="font-semibold text-lg">Name:</span>
                  <input
                    className="border-b focus:outline-none"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    required
                  />
                </label>
                <label className="flex gap-3 pt-2" htmlFor="">
                  <span className="font-semibold text-lg">Age:</span>
                  <input
                    className="border-b focus:outline-none"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    min="1"
                    required
                  />
                </label>
                <label className="flex gap-3 pt-3" htmlFor="">
                  <span className="font-semibold text-lg">Gender:</span>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    className="border rounded mt-1"
                    required
                  >
                    <option value="" hidden>
                      Select Gender
                    </option>
                    <option
                      selected={gender == "male" ? true : false}
                      value="male"
                    >
                      Male
                    </option>
                    <option
                      selected={gender == "female" ? true : false}
                      value="female"
                    >
                      Female
                    </option>
                    <option
                      selected={gender == "others" ? true : false}
                      value="others"
                    >
                      Others
                    </option>
                  </select>
                </label>
                <div className="w-full flex justify-end">
                  <input
                    className="bg-[#814de5] text-white font-semibold w-13 py-1 rounded-lg cursor-pointer hover:bg-[#692be0]"
                    type="submit"
                    value="Save"
                  />
                </div>
              </form>
            </>
          )}
        </div>
        <div className="border-b border-gray-300 py-6">
          <h3 className="text-2xl font-bold">Doctors</h3>
          {doctors.length > 0 ? (
            <>
              <table className="mt-2 max-w-6xl max-sm:text-sm">
                <thead>
                  <tr>
                    <th className="text-start py-1 max-sm:pr-6 pr-10">Name</th>
                    <th className="text-start py-1 max-sm:pr-6 pr-10">
                      Specialist
                    </th>
                    <th className="text-start py-1 max-sm:pr-6 pr-10">
                      Number
                    </th>
                    <th className="text-start py-1 max-sm:pr-6 pr-10">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((a, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-start py-2 max-sm:pr-6 pr-10">
                          {a.name}
                        </td>
                        <td className="text-start py-2 max-sm:pr-6 pr-10">
                          {a.speciality}
                        </td>
                        <td className="text-start py-2 max-sm:pr-6 pr-10">
                          {a.number}
                        </td>
                        <td className="flex border-gray-200 relative py-5">
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
                              className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-1 top-14"
                            >
                              <li
                                onClick={() => deleteDoctor(a._id)}
                                className="w-full p-2 px-3 cursor-pointer border-b hover:bg-gray-300"
                              >
                                Delete
                              </li>
                              <li
                                onClick={() => {
                                  setMenuView(false);
                                  setEditDoctor(a._id);
                                  setEditDoctorName(a.name);
                                  setEditDoctorSpeciality(a.speciality);
                                  setEditDoctorNumber(a.number);
                                }}
                                className="w-full p-2 px-3 cursor-pointer hover:bg-gray-300"
                              >
                                Edit
                              </li>
                            </ul>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {editDoctor !== false ? (
                <form
                  onSubmit={(e) => editDoctorHandler(e)}
                  className="sm:flex mt-5 mb-8 items-center w-full max-sm:text-sm"
                  action=""
                >
                  <label className="max-sm:inline-block mr-6" htmlFor="">
                    <input
                      className="border-b w-20 focus:outline-none"
                      required
                      value={editDoctorName}
                      onChange={(e) => setEditDoctorName(e.target.value)}
                      type="text"
                      placeholder="Name"
                    />
                  </label>
                  <label className="max-sm:inline-block mr-6" htmlFor="">
                    <input
                      className="border-b w-25 focus:outline-none"
                      required
                      value={editDoctorSpeciality}
                      onChange={(e) => setEditDoctorSpeciality(e.target.value)}
                      type="text"
                      placeholder="Speciality"
                    />
                  </label>
                  <label className="max-sm:inline-block sm:mr-6" htmlFor="">
                    <input
                      className="border-b w-26 focus:outline-none"
                      value={editDoctorNumber}
                      onChange={(e) => setEditDoctorNumber(e.target.value)}
                      type="number"
                      placeholder="Number"
                      required
                    />
                  </label>
                  <input
                    type="submit"
                    value="Save Changes"
                    className="bg-[#814de5] text-white font-semibold py-1 px-2 max-sm:py-2 rounded-lg cursor-pointer hover:bg-[#692be0] max-sm:block max-sm:mt-3 max-sm:w-full"
                  />
                </form>
              ) : (
                ""
              )}
            </>
          ) : (
            <p className="text-xl lg:w-1/2 max-sm:text-lg text-gray-400 text-center">
              No Doctor Records
            </p>
          )}
          <form
            onSubmit={(e) => doctorSubmitHandler(e)}
            className="sm:flex mt-5 items-center w-full max-sm:text-sm"
            action=""
          >
            <label className="max-sm:inline-block mr-6" htmlFor="">
              <input
                className="border-b w-20 focus:outline-none"
                required
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </label>
            <label className="max-sm:inline-block mr-6" htmlFor="">
              <input
                className="border-b w-25 focus:outline-none"
                required
                value={doctorSpeciality}
                onChange={(e) => setDoctorSpeciality(e.target.value)}
                type="text"
                placeholder="Speciality"
              />
            </label>
            <label className="max-sm:inline-block sm:mr-6" htmlFor="">
              <input
                className="border-b w-26 focus:outline-none"
                value={doctorNumber}
                onChange={(e) => setDoctorNumber(e.target.value)}
                type="number"
                placeholder="Number"
                required
              />
            </label>
            <input
              type="submit"
              value="Add"
              className="bg-[#814de5] text-white font-semibold px-3 py-1 max-sm:py-2 rounded-lg cursor-pointer hover:bg-[#692be0] max-sm:block max-sm:mt-3 max-sm:w-full"
            />
          </form>
        </div>
        <div className="md:flex gap-10 lg:w-3/5">
          <div className="py-5 md:w-1/2">
            <h3 className="text-2xl font-bold ">Upcoming Appointments</h3>
            {appointments.filter(
              (a) => new Date(a.date) >= new Date().setHours(0, 0, 0, 0)
            ).length > 0 ? (
              appointments
                .filter(
                  (a) => new Date(a.date) >= new Date().setHours(0, 0, 0, 0)
                )
                .sort(
                  (a, b) =>
                    new Date(`${a.date}T${a.time}`) -
                    new Date(`${b.date}T${b.time}`)
                )
                .map((a, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-5 p-2 mt-3 md:w-full cursor-pointer text-white bg-[#9d75eb] rounded-xl hover:bg-[#814de5]`}
                    onClick={() => navigate("/appointment")}
                  >
                    <div className="w-15 h-full p-3 flex rounded-xl items-center justify-center">
                      <img className="h-8" src={appointment} alt="" />
                    </div>
                    <div>
                      <p className="font-bold">
                        {moment(a.date).format("DD-MM-YYYY")}, {a.time}
                      </p>
                      <p className="text-white text-sm font-semibold ">
                        {a.doctorName}, {a.purpose}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-xl max-sm:text-lg text-gray-400 pt-5 text-center">
                No Upcoming Appointments
              </p>
            )}
          </div>
          <div className="py-5 md:w-1/2">
            <h3 className="text-2xl font-bold">Upcoming Test Appointments</h3>
            {testAppointments.filter(
              (a) => new Date(a.date) >= new Date().setHours(0, 0, 0, 0)
            ).length > 0 ? (
              testAppointments
                .filter(
                  (a) => new Date(a.date) >= new Date().setHours(0, 0, 0, 0)
                )
                .sort(
                  (a, b) =>
                    new Date(`${a.date}T${a.time}`) -
                    new Date(`${b.date}T${b.time}`)
                )
                .map((a, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-5 p-2 mt-3 md:w-full cursor-pointer text-white bg-[#9d75eb] rounded-xl hover:bg-[#814de5]`}
                    onClick={() => navigate("/testAppointment")}
                  >
                    <div className="w-15 h-full p-3 flex rounded-xl items-center justify-center">
                      <img className="h-8" src={injection} alt="" />
                    </div>
                    <div>
                      <p className="font-bold">
                        {moment(a.date).format("DD-MM-YYYY")}, {a.time}
                      </p>
                      <p className="text-white text-sm font-semibold ">
                        {a.labName}, {a.purpose}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-xl max-sm:text-lg text-gray-400 pt-5 text-center">
                No Upcoming Test Appointments
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default HomeMain;
