import React, { useEffect, useState } from "react";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";
import { getHospitals } from "../services/hospitalService";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import { Link } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    const { data } = await getPatients();
    setPatients(data);
    const h = await getHospitals();
    setHospitals(h.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data) => {
    if (editData) {
      await updatePatient(editData._id, data);
    } else {
      await createPatient(data);
    }
    setModalVisible(false);
    setEditData(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await deletePatient(id);
    loadData();
  };

  return (
    <div className="page-container">
      <h1>Patients</h1>

      <div className="actions">
        <button className="add-btn" onClick={() => setModalVisible(true)}>
          + Add Patient
        </button>
      </div>

      <DataTable
        data={patients}
        columns={[
          {
            header: "Name",
            accessor: "name",
            render: (row) => (
              <Link to={`/patients/${row._id}`}>{row.name}</Link>
            ),
          },
          { header: "Age", accessor: "age" },
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
          { name: "name", label: "Patient Name" },
          { name: "age", label: "Age", type: "number" },
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

export default Patients;
