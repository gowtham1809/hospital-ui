import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/appointments`;

export const getAppointments = () => axios.get(API_URL);
export const getAppointment = (id) => axios.get(`${API_URL}/${id}`);
export const createAppointment = (data) => axios.post(API_URL, data);
export const updateAppointment = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`);
