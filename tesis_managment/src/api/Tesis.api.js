import axios from "axios";
export const getAllDocument = () => {
  return axios.get("http://localhost:8000/Documento/");
};
export const addDocument = (document) => {
  return axios.post("http://localhost:8000/Documento/", document);
};
export const deleteDocument = async (id) => {
  return await axios.delete(`http://localhost:8000/Documento/${id}/`);
};
export const getDocument = async (id) => {
  return await axios.get(`http://localhost:8000/Documento/${id}/`);
};
export const updateDocument = async (id, documento) => {
  return await axios.put(`http://localhost:8000/Documento/${id}/`, documento);
};
