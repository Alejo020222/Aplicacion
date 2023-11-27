import axios from "axios";

export const getAllUsuarios = () => {
  return axios.get("http://localhost:8000/Usuario/");
};
export const addUsuarios = (usuario) => {
  return axios.post("http://localhost:8000/Usuario/", usuario);
};
export const deleteUsuarios = async (id) => {
  return await axios.delete(`http://localhost:8000/Usuario/${id}/`);
};
export const getUsuarios = async (id) => {
  return await axios.get(`http://localhost:8000/Usuario/${id}/`);
};
export const updateUsuarios = async (id, usuario) => {
  return await axios.put(`http://localhost:8000/Usuario/${id}/`, usuario);
};
