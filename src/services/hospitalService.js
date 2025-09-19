import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/hospitals`;

export const getHospitals = () => axios.get(API_URL);
export const getHospital = (id) => axios.get(`${API_URL}/${id}`);
export const createHospital = (data) => axios.post(API_URL, data);
export const updateHospital = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteHospital = (id) => axios.delete(`${API_URL}/${id}`);
