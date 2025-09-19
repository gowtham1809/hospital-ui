import React, { useEffect, useState } from "react";
import {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../services/hospitalService";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import { Link } from "react-router-dom";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadHospitals = async () => {
    const { data } = await getHospitals();
    setHospitals(data);
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const handleSave = async (data) => {
    if (editData) {
      await updateHospital(editData._id, data);
    } else {
      await createHospital(data);
    }
    setModalVisible(false);
    setEditData(null);
    loadHospitals();
  };

  const handleDelete = async (id) => {
    await deleteHospital(id);
    loadHospitals();
  };

  return (
    <div className="page-container">
      <h1>Hospitals</h1>

      <div className="actions">
        <button className="add-btn" onClick={() => setModalVisible(true)}>
          + Add Hospital
        </button>
      </div>

      <DataTable
        data={hospitals}
        columns={[
          {
            header: "Name",
            accessor: "name",
            render: (row) => <Link to={`/hospitals/${row._id}`}>{row.name}</Link>,
          },
          { header: "Location", accessor: "location" },
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
            name: "name",
            label: "Hospital Name",
          },
          { name: "location", label: "Location" },
        ]}
        initialData={editData}
      />
    </div>
  );
};

export default Hospitals;
