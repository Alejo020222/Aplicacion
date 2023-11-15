import axios from "axios";

export const getAllDefensa = () => {
  return axios.get("http://localhost:8000/Defensa/");
};
export const addDefensa = (defensa) => {
  return axios.post("http://localhost:8000/Defensa/", defensa);
};
export const deleteDefensa = async (id) => {
  return await axios.delete(`http://localhost:8000/Defensa/${id}/`);
};
export const getDefensa = async (id) => {
  return await axios.get(`http://localhost:8000/Defensa/${id}/`);
};
export const updateDefensa = async (id, defensa) => {
  return await axios.put(`http://localhost:8000/Defensa/${id}/`, defensa);
};
