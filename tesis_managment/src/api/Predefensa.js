import axios from "axios";

export const getAllPredefensa = () => {
  return axios.get("http://localhost:8000/Predefensa/");
};
export const addPredefensa = (predefensa) => {
  return axios.post("http://localhost:8000/Predefensa/", predefensa);
};
export const deletePredefensa = async (id) => {
  return await axios.delete(`http://localhost:8000/Predefensa/${id}/`);
};
export const getPredefensa = async (id) => {
  return await axios.get(`http://localhost:8000/Predefensa/${id}/`);
};
export const updatePredefensa = async (id, predefensa) => {
  return await axios.put(`http://localhost:8000/Predefensa/${id}/`, predefensa);
};
