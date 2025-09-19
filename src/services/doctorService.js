import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/doctors`;

export const getDoctors = () => axios.get(API_URL);
export const getDoctor = (id) => axios.get(`${API_URL}/${id}`);
export const createDoctor = (data) => axios.post(API_URL, data);
export const updateDoctor = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDoctor = (id) => axios.delete(`${API_URL}/${id}`);
