import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoctor } from "../services/doctorService";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    getDoctor(id).then((res) => setDoctor(res.data));
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div>
      <h2>👨‍⚕️ {doctor.name}</h2>
      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>
      <p>
        <strong>Hospital:</strong>
        <Link to={`/hospitals/${doctor.hospital?._id}`}>
          {doctor.hospital?.name}
        </Link>
      </p>

      <h3>Appointments</h3>
      <ul>
        {doctor.appointments?.map((appt) => (
          <li key={appt._id}>
            <Link to={`/appointments/${appt._id}`}>
              {new Date(appt.date).toLocaleString()} with {appt.patient}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDetails;
