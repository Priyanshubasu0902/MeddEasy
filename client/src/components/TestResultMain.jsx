import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const TestResultMain = () => {
  const { view } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen w-3/4 ${
        view ? "" : "w-full"
      } px-10 py-10 flex flex-col gap-5`}
    >
      <h1 className="text-6xl font-semibold">Test Results</h1>
      <p className="text-gray-500">
        Upload and manage your test results
      </p>
      <div className="lg:w-3/4">
        <form className="flex flex-col gap-5" action="">
          <div className="flex w-full gap-3">
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">File Name:</span>
              <br />
              <input
                className="w-full pl-1 h-8 bg-gray-100 border border-gray-500 rounded mt-1"
                placeholder="Enter file name"
                type="text"
              />
            </label>
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">File Description:</span>
              <br />
              <input
                className="w-full pl-1 h-8 bg-gray-100 border border-gray-500 rounded mt-1"
                placeholder="Enter test details"
                type="text"
              />
            </label>
          </div>
          <div className="w-full h-80 border border-dashed border-gray-500 flex flex-col items-center justify-center gap-3">
            <h3 className="text-center text-lg font-medium">
              Drag and Drop or browse to upload
            </h3>
            <p className="text-center">Accepted file types: PDF, Docs</p>
            <label
              className="text-center cursor-pointer bg-gray-300 w-1/8 h-9 pt-1 rounded-md lg:w-1/10 font-semibold"
              htmlFor="file"
            >
              Browse Files
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".pdf, .doc, .docx"
              />
            </label>
          </div>
          <input
            className="w-full bg-blue-300 h-8 cursor-pointer"
            type="submit"
            value="Upload"
          />
        </form>
      </div>
      <div className="flex flex-col gap-3 pt-5">
        <h3 className="text-xl font-bold">Uploaded Test Results</h3>
        <div>
          <table className="w-full max-w-4xl bg-white rounded border border-gray-200 border-b max-sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">File Name</th>
                <th className="py-2 px-4 text-left">Upload Date</th>
                <th className="py-2 px-4 text-left"></th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Prescription for Allergy.pdf
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 26, 2024, 10:30 AM
                </td>
                <td className="py-2 px-3 border-b border-gray-200 text-left">
                  <button className="w-15 h-9 bg-blue-100 cursor-pointer">
                    View
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md h-7 bg-blue-300 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-full rounded-md h-7 bg-red-300 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Prescription for Allergy.pdf
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 26, 2024, 10:30 AM
                </td>
                <td className="py-2 px-3 border-b border-gray-200 text-left">
                  <button className="w-15 h-9 bg-blue-100 cursor-pointer">
                    View
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md h-7 bg-blue-300 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-full rounded-md h-7 bg-red-300 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Prescription for Allergy.pdf
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 26, 2024, 10:30 AM
                </td>
                <td className="py-2 px-3 border-b border-gray-200 text-left">
                  <button className="w-15 h-9 bg-blue-100 cursor-pointer">
                    View
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md h-7 bg-blue-300 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-full rounded-md h-7 bg-red-300 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Prescription for Allergy.pdf
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 26, 2024, 10:30 AM
                </td>
                <td className="py-2 px-3 border-b border-gray-200 text-left">
                  <button className="w-15 h-9 bg-blue-100 cursor-pointer">
                    View
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md h-7 bg-blue-300 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-full rounded-md h-7 bg-red-300 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Prescription for Allergy.pdf
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 26, 2024, 10:30 AM
                </td>
                <td className="py-2 px-3 border-b border-gray-200 text-left">
                  <button className="w-15 h-9 bg-blue-100 cursor-pointer">
                    View
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md h-7 bg-blue-300 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-full rounded-md h-7 bg-red-300 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  Prescription for Allergy.pdf
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  July 26, 2024, 10:30 AM
                </td>
                <td className="py-2 px-3 border-b border-gray-200 text-left">
                  <button className="w-15 h-9 bg-blue-100 cursor-pointer">
                    View
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <div className="flex flex-col gap-3">
                    <button className="w-full rounded-md h-7 bg-blue-300 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-full rounded-md h-7 bg-red-300 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestResultMain;
