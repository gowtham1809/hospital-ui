import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHospital } from "../services/hospitalService";

const HospitalDetails = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    getHospital(id).then((res) => setHospital(res.data));
  }, [id]);

  if (!hospital) return <p>Loading...</p>;

  return (
    <div>
      <h2>🏥 {hospital.name}</h2>
      <p>
        <strong>Location:</strong> {hospital.location}
      </p>

      <h3>Doctors in this Hospital</h3>
      <ul>
        {hospital.doctors?.map((doc) => (
          <li key={doc._id}>
            <Link to={`/doctors/${doc._id}`}>
              {doc.name} ({doc.specialization})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalDetails;
