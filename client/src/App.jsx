import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Readings from "./pages/Readings";
import Appointment from "./pages/Appointment";
import TestResult from "./pages/TestResult";
import EditTestResult from "./pages/EditTestResult";
import Prescriptions from "./pages/Prescriptions";
import EditPrescription from "./pages/EditPrescription";
import AddReadings from "./pages/AddReadings";
import AddAppointments from "./pages/AddAppointments";
import EditAppointments from "./pages/EditAppointments";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import { ToastContainer } from "react-toastify";
import EditReadings from "./pages/EditReadings";
import ForgotPassword from "./pages/ForgotPassword";
import SetPassword from "./pages/SetPassword";
import TestAppointment from "./pages/TestAppointment";
import EditTestAppointments from "./pages/EditTestAppointments";
import AddTestAppointments from "./pages/AddTestAppointments";

const App = () => {
  const { userToken, userData } = useContext(AppContext);

  return (
    <div className="">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {userToken && userData ? (
          <>
            <Route path="/setPassword" element={<SetPassword/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/readings" element={<Readings />} />
            <Route path="/addReadings" element={<AddReadings />} />
            <Route path="/editReadings/:id" element={<EditReadings />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/testAppointment" element={<TestAppointment />} />
            <Route path="/addAppointments" element={<AddAppointments />} />
            <Route path="/addTestAppointments" element={<AddTestAppointments/>} />
            <Route
              path="/editAppointments/:id"
              element={<EditAppointments />}
            />
            <Route
              path="/editTestAppointments/:id"
              element={<EditTestAppointments/>}
            />
            <Route path="/testResults" element={<TestResult />} />
            <Route path="/editTestresult/:id" element={<EditTestResult />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route
              path="/editPrescription/:id"
              element={<EditPrescription />}
            />
          </>
        ) : null}
      </Routes>
    </div>
  );
};

export default App;
