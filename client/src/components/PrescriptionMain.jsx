import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import dot from "../assets/dots.png";

const PrescriptionMain = () => {
  const { view, userToken, backendUrl, doctors } = useContext(AppContext);

  const [prescription, setPrescription] = useState(false);
  const [fileName, setFileName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [menuView, setMenuView] = useState(false);
  const menu = useRef(null);

  const closeMenu = (e) => {
    if (e.target !== menu.current && menuView !== false) {
      setMenuView(false);
    }
  };

  const navigate = useNavigate();

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/prescriptions/getPrescriptions",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setResults(data.prescription);
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
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("doctorName", doctorName);
      formData.append("prescription", prescription);

      const { data } = await axios.post(
        backendUrl + "/api/prescriptions/addPrescription",
        formData,
        { headers: { token: userToken } }
      );
      if (data.success) {
        toast.success("Prescription added");
        setFileName("");
        setDoctorName("");
        setPrescription("");
        fetchPrescriptions();
        setQuery("");
        setFilteredItems([]);
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

  const deletePrescriptions = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/prescriptions/deletePrescription/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setMenuView(false);
        fetchPrescriptions();
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

  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      setMenuView(false);
      toast.success("File Donwloaded");
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async (url, filename) => {
    if (navigator.share) {
      await navigator
        .share({
          title: filename || "Shared PDF",
          text: 'Check out the shared document',
          url: url,
        })
        .then(() => {
          toast.success("Shared Successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Web Share API is not supported in this browser");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    if (query !== "" && doctorName === "") {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
    if (query !== doctorName) {
      setDoctorName("");
    }
  }, [query]);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-8 max-sm:px-4 py-10 flex flex-col gap-5 max-sm:gap-3 max-md:mt-20`}
      onClick={closeMenu}
    >
      <h1 className="text-6xl max-sm:text-5xl font-semibold">Prescriptions</h1>
      <p className="text-gray-500">
        Upload and manage your prescription documents
      </p>
      <div className="lg:w-3/4">
        <form
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex w-full gap-3 mt-1">
            <label className="w-1/2" htmlFor="">
              <input
                className="w-full pl-2 focus:outline-[#692be0] focus:outline-3 h-12 border rounded"
                placeholder="Enter file name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </label>
            <label className="w-1/2" htmlFor="">
              <input
                className="w-full pl-2 focus:outline-[#692be0] focus:outline-3 h-12 border rounded"
                placeholder="Enter doctor name"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                required
              />
              <ul
                className={`w-1/4 max-sm:w-1/3 shadow-lg bg-gray-200 mt-1 absolute z-1 ${
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
            <p>{prescription ? prescription.name : ""}</p>
          </div>
          <input
            className="w-full bg-[#814de5] font-semibold text-white h-12 text-lg cursor-pointer hover:bg-[#692be0]"
            type="submit"
            value="Upload"
          />
        </form>
      </div>
      <div className="flex flex-col gap-3 pt-5">
        <h3 className="text-2xl font-bold">Uploaded Prescriptions</h3>
        <div>
          {results.length > 0 ? (
            <table className="w-full max-w-4xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left">File Name</th>
                  <th className="py-2 max-sm:hidden px-4 text-left">
                    Doctor Name
                  </th>
                  <th className="py-2 px-4 text-left">Upload Date</th>
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .filter(() => true)
                  .reverse()
                  .map((a, index) => (
                    <tr key={index} className="text-gray-800">
                      <td className="py-2 px-4 border-b border-gray-200 text-left">
                        {a.fileName}
                      </td>
                      <td className="py-2 px-4 max-sm:hidden border-b border-gray-200 text-left">
                        {a.doctorName}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">
                        {moment(a.date).format("lll")}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <a href={a.link} target="_blank">
                          <button className="w-15 h-9 bg-[#814de5] font-semibold text-white cursor-pointer hover:bg-[#692be0]">
                            View
                          </button>
                        </a>
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
                            className="flex flex-col bg-gray-200 absolute text-center text-[#692be0] font-semibold z-1 top-14"
                          >
                            <li
                              onClick={() =>
                                navigate(`/editPrescription/${a._id}`)
                              }
                              className="w-full p-2 cursor-pointer border-b hover:bg-gray-300"
                            >
                              Edit
                            </li>
                            <li
                              onClick={() => deletePrescriptions(a._id)}
                              className="w-full p-2 cursor-pointer border-b hover:bg-gray-300"
                            >
                              Delete
                            </li>
                            <li
                              onClick={() => handleShare(a.link, a.fileName)}
                              className="w-full p-2 cursor-pointer border-b hover:bg-gray-300"
                            >
                              Share
                            </li>
                            <li
                              onClick={() => handleDownload(a.link, a.fileName)}
                              className="w-full p-2 cursor-pointer hover:bg-gray-300"
                            >
                              Download
                            </li>
                          </ul>
                        ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl max-sm:text-lg text-gray-400 text-center">No Record</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default PrescriptionMain;
