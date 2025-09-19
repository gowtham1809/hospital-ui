import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPatient } from "../services/patientService";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatient(id).then((res) => setPatient(res.data));
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>🧑‍🦽 {patient.name}</h2>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>
      <p>
        <strong>Hospital:</strong> {patient.hospital?.name}
      </p>

      <h3>Appointments</h3>
      <ul>
        {patient.appointments?.map((appt) => (
          <li key={appt._id}>
            <Link to={`/appointments/${appt._id}`}>
              {new Date(appt.date).toLocaleString()} with {appt.doctor}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetails;
