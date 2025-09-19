import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/patients`;

export const getPatients = () => axios.get(API_URL);
export const getPatient = (id) => axios.get(`${API_URL}/${id}`);
export const createPatient = (data) => axios.post(API_URL, data);
export const updatePatient = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePatient = (id) => axios.delete(`${API_URL}/${id}`);
