import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Readings from "./pages/Readings";
import Appointment from "./pages/Appointment";
import TestResult from "./pages/TestResult";
import Prescriptions from "./pages/Prescriptions";
import AddReadings from "./pages/AddReadings";
import AddAppointments from "./pages/AddAppointments";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/readings" element={<Readings />}></Route>
        <Route path="/addReadings" element={<AddReadings />} />
        <Route path="/appointment" element={<Appointment />}></Route>
        <Route path="/addAppointments" element={<AddAppointments />}></Route>
        <Route path="/testresults" element={<TestResult />}></Route>
        <Route path="/prescriptions" element={<Prescriptions />}></Route>
      </Routes>
    </div>
  );
};

export default App;
