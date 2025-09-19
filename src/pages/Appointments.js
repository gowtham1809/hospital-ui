import React, { useEffect, useState } from "react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";
import { getPatients } from "../services/patientService";
import { getDoctors } from "../services/doctorService";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    const { data } = await getAppointments();
    setAppointments(data);
    const p = await getPatients();
    setPatients(p.data);
    const d = await getDoctors();
    setDoctors(d.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data) => {
    if (editData) {
      await updateAppointment(editData._id, data);
    } else {
      await createAppointment(data);
    }
    setModalVisible(false);
    setEditData(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    loadData();
  };

  return (
    <div className="page-container">
      <h1>Appointments</h1>

      <div className="actions">
        <button className="add-btn" onClick={() => setModalVisible(true)}>
          + Add Appointment
        </button>
      </div>

      <DataTable
        data={appointments}
        columns={[
          {
            header: "Patient",
            accessor: "patient_id.name",
            render: (row) => (
              <Link to={`/patients/${row.patient_id._id}`}>
                {row.patient_id.name}
              </Link>
            ),
          },
          {
            header: "Doctor",
            accessor: "doctor_id.name",
            render: (row) => (
              <Link to={`/doctors/${row.doctor_id._id}`}>
                {row.doctor_id.name}
              </Link>
            ),
          },
          { header: "Date", accessor: "date" },
          { header: "Time", accessor: "time" },
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
          {
            name: "patient_id",
            label: "Patient",
            type: "select",
            options: patients.map((p) => ({ value: p._id, label: p.name })),
          },
          {
            name: "doctor_id",
            label: "Doctor",
            type: "select",
            options: doctors.map((d) => ({ value: d._id, label: d.name })),
          },
          { name: "date", label: "Date", type: "datetime-local" },
        ]}
        initialData={editData}
      />
    </div>
  );
};

export default Appointments;
