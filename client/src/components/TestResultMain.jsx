import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import dot from "../assets/dots.png";

const TestResultMain = () => {
  const { view, userToken, backendUrl } = useContext(AppContext);

  const [testResult, setTestResult] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuView, setMenuView] = useState(false);
  const menu = useRef(null);

  const closeMenu = (e) => {
    if (e.target !== menu.current && menuView !== false) {
      setMenuView(false);
    }
  };

  const navigate = useNavigate();

  const fetchTestResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/testResults/getTestResults",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setResults(data.testResults);
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
      formData.append("fileDescription", fileDescription);
      formData.append("testResult", testResult);

      const { data } = await axios.post(
        backendUrl + "/api/testResults/addTestResult",
        formData,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setFileName("");
        setFileDescription("");
        setTestResult(false);
        fetchTestResults();
        setLoading(false);
        toast.success("Test Result added");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const deleteTestResult = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/testResults/deleteTestResult/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setMenuView(false);
        fetchTestResults();
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
    fetchTestResults();
  }, []);

  return !loading ? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-8 max-sm:px-4 py-10 flex flex-col gap-5 max-sm:gap-3 mt-20`}
      onClick={closeMenu}
    >
      <h1 className="text-6xl max-sm:text-4xl font-semibold">Lab Test Results</h1>
      <p className="text-gray-500">Upload and manage your lab test results</p>
      <div className="lg:w-3/4">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-3"
          action=""
        >
          <div className="flex w-full gap-3 mt-1">
            <label className="w-1/2" htmlFor="">
              <input
                className="w-full pl-2 focus:outline-[#692be0] focus:outline-3 border h-12 rounded"
                placeholder="File name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </label>
            <label className="w-1/2" htmlFor="">
              <input
                className="w-full pl-2 h-12 focus:outline-[#692be0] focus:outline-3 border rounded"
                placeholder="Test details"
                type="text"
                onChange={(e) => setFileDescription(e.target.value)}
                value={fileDescription}
                required
              />
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
                onChange={(e) => setTestResult(e.target.files[0])}
              />
            </label>
            <p>{testResult ? testResult.name : ""}</p>
          </div>
          <input
            className="w-full bg-[#814de5] font-semibold text-white text-lg h-12 cursor-pointer hover:bg-[#692be0]"
            type="submit"
            value="Upload"
          />
        </form>
      </div>
      <div className="flex flex-col gap-3 pt-5">
        <h3 className="text-2xl font-bold">Uploaded Test Results</h3>
        <div>
          {results.length > 0 ? (
            <table className="w-full max-w-4xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left">File Name</th>
                  <th className="py-2 px-4 text-left">Upload Date</th>
                  <th className="py-2 max-sm:hidden px-4 text-left">
                    File Description
                  </th>
                  <th className="py-2 px-4 text-left"></th>
                  <th className="py-2 px-4 text-center">Actions</th>
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
                      <td className="py-2 px-4 border-b border-gray-200 text-left">
                        {moment(a.date).format("lll")}
                      </td>
                      <td className="py-2 max-sm:hidden px-4 border-b border-gray-200 text-left">
                        {a.fileDescription}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-200 text-left">
                        <a href={a.link} target="_blank">
                          <button className="w-15 h-9 bg-[#814de5] font-semibold text-white cursor-pointer hover:bg-[#692be0]">
                            View
                          </button>
                        </a>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 flex justify-center text-left relative py-5">
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
                                navigate(`/editTestResult/${a._id}`)
                              }
                              className="w-full p-2 cursor-pointer border-b hover:bg-gray-300"
                            >
                              Edit
                            </li>
                            <li
                              onClick={() => {
                                deleteTestResult(a._id);
                              }}
                              className="w-full p-2 cursor-pointer border-b hover:bg-gray-300"
                            >
                              Delete
                            </li>
                            <li
                              onClick={() => {
                                handleShare(a.link, a.filename);
                              }}
                              className="w-full p-2 cursor-pointer border-b hover:bg-gray-300"
                            >
                              Share
                            </li>
                            <a>
                              <li
                                onClick={() =>
                                  handleDownload(a.link, a.fileName)
                                }
                                className="w-full p-2 cursor-pointer hover:bg-gray-300"
                              >
                                Download
                              </li>
                            </a>
                          </ul>
                        ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl lg:w-1/2 max-sm:text-lg text-gray-400 text-center">No Records</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default TestResultMain;
