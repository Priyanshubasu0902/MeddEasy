import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditPrescriptionMain = () => {
  const { view, userToken, backendUrl, doctors } = useContext(AppContext);

  const [prescription, setPrescription] = useState(false);
  const [fileName, setFileName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/prescriptions/getPrescription/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        setFileName(data.prescription.fileName);
        setDoctorName(data.prescription.doctorName);
        setQuery(data.prescription.doctorName);
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
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("doctorName", doctorName);
      formData.append("prescription", prescription);

      const { data } = await axios.post(
        backendUrl + `/api/prescriptions/editPrescription/${id}`,
        formData,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        setFileName("");
        setDoctorName("");
        setPrescription(false);
        setQuery("");
        setFilteredItems([]);
        navigate("/prescriptions");
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
    fetchPrescriptions();
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
    if(query!==doctorName) {
      setDoctorName('');
    }
  }, [query]);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-8 py-10 flex flex-col gap-5 max-md:mt-20`}
    >
      <h1 className="text-6xl font-semibold">Prescriptions</h1>
      <p className="text-gray-500">Edit your prescription</p>
      <div className="lg:w-3/4">
        <form
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
          className="flex flex-col gap-3"
          action=""
        >
          <div className="flex w-full gap-3">
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">File Name:</span>
              <br />
              <input
                className="w-full pl-2 h-12 focus:outline-[#692be0] focus:outline-3 border rounded mt-1"
                placeholder="Enter file name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </label>
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">Doctor Name:</span>
              <br />
              <input
                className="w-full pl-2 h-12 focus:outline-[#692be0] focus:outline-3 border rounded mt-1"
                placeholder="Enter doctor name"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                required
              />
              <ul
                className={`w-1/4 shadow-lg bg-gray-200 mt-1 absolute z-10 ${
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
                  {
                    query!==''&&!doctorName&&<li onClick={()=>navigate('/home')} className="px-3 py-2 hover:bg-gray-300 font-bold">Add More Doctor</li>
                  }
              </ul>
            </label>
          </div>
          <div className="w-full h-80 border border-dashed border-3 border-[#814de5] flex flex-col items-center justify-center gap-1">
            <h3 className="text-center text-lg font-medium">
              Drag and Drop or browse to upload
            </h3>
            <p className="text-center pt-2">Accepted file types: PDF, Docs</p>
            <label
              className="text-center cursor-pointer bg-[#814de5] font-semibold text-white mt-2 p-2 h-9 pt-1 rounded-md font-semibold hover:bg-[#692be0]"
              htmlFor="file"
            >
              Browse Files
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setPrescription(e.target.files[0])}
              />
            </label>
            <p>{prescription ? prescription.name : fileName + ".pdf"}</p>
          </div>
          <input
            className="w-full bg-[#814de5] font-semibold text-white h-12 text-lg cursor-pointer hover:bg-[#692be0]"
            type="submit"
            value="Save Changes"
          />
        </form>
      </div>
    </div>
  ) : (
    <Loading dashboard={false}/>
  );
};

export default EditPrescriptionMain;
