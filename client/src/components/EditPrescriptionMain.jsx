import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditPrescriptionMain = () => {
  const { view, userToken, backendUrl } = useContext(AppContext);

  const [prescription, setPrescription] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [doctorName, setDoctorName] = useState(null);
  const [loading, setLoading] = useState(false);

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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
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
        setPrescription("");
        navigate("/prescriptions");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-8 py-10 flex flex-col gap-5`}
    >
      <h1 className="text-6xl font-semibold">Prescriptions</h1>
      <p className="text-gray-500">Edit your prescription</p>
      <div className="lg:w-3/4">
        <form
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
          className="flex flex-col gap-5"
          action=""
        >
          <div className="flex w-full gap-3">
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">File Name:</span>
              <br />
              <input
                className="w-full pl-1 h-8 bg-gray-100 border border-gray-500 rounded mt-1"
                placeholder="Enter file name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </label>
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">Doctor Name:</span>
              <br />
              <input
                className="w-full pl-1 h-8 bg-gray-100 border border-gray-500 rounded mt-1"
                placeholder="Enter doctor name"
                type="text"
                onChange={(e) => setDoctorName(e.target.value)}
                value={doctorName}
              />
            </label>
          </div>
          <div className="w-full h-80 border border-dashed border-gray-500 flex flex-col items-center justify-center gap-1">
            <h3 className="text-center text-lg font-medium">
              Drag and Drop or browse to upload
            </h3>
            <p className="text-center pt-2">Accepted file types: PDF, Docs</p>
            <label
              className="text-center cursor-pointer bg-[#814de5] font-semibold text-white mt-2 p-2 h-9 pt-1 rounded-md font-semibold"
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
            className="w-full bg-[#814de5] font-semibold text-white h-8 cursor-pointer"
            type="submit"
            value="Save Changes"
          />
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default EditPrescriptionMain;
