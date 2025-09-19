import React, { useEffect, useState } from "react";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";
import { getHospitals } from "../services/hospitalService";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import { Link } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    const { data } = await getDoctors();
    setDoctors(data);
    const h = await getHospitals();
    setHospitals(h.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data) => {
    if (editData) {
      await updateDoctor(editData._id, data);
    } else {
      await createDoctor(data);
    }
    setModalVisible(false);
    setEditData(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    loadData();
  };

  return (
    <div className="page-container">
      <h1>Doctors</h1>

      <div className="actions">
        <button className="add-btn" onClick={() => setModalVisible(true)}>
          + Add Doctor
        </button>
      </div>

      <DataTable
        data={doctors}
        columns={[
          {
            header: "Name",
            accessor: "name",
            render: (row) => (
              <Link to={`/doctors/${row._id}`}>{row.name}</Link>
            ),
          },
          { header: "Specialization", accessor: "specialization" },
          { header: "Hospital", accessor: "hospital_id.name" },
        ]}
        onEdit={(row) => {
          setEditData(row);
          setModalVisible(true);
        }}
        onDelete={handleDelete}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditData(null);
        }}
        onSubmit={handleSave}
        fields={[
          { name: "name", label: "Doctor Name" },
          { name: "specialization", label: "Specialization" },
          {
            name: "hospital_id",
            label: "Hospital",
            type: "select",
            options: hospitals.map((h) => ({ value: h._id, label: h.name })),
          },
        ]}
        initialData={editData}
      />
    </div>
  );
};

export default Doctors;
