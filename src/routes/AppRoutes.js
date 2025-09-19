import React from "react";
import { Routes, Route } from "react-router-dom";

import Hospitals from "../pages/Hospitals";
import Doctors from "../pages/Doctors";
import Patients from "../pages/Patients";
import Appointments from "../pages/Appointments";
import HospitalDetails from "../pages/HospitalDetails";
import DoctorDetails from "../pages/DoctorDetails";
import PatientDetails from "../pages/PatientDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to Hospital Management</h1>} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/hospitals/:id" element={<HospitalDetails />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/:id" element={<PatientDetails />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
};

export default AppRoutes;
