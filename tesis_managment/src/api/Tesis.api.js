import axios from "axios";
export const getAllDocument = () => {
  return axios.get("http://localhost:8000/Documento/");
};
export const addDocument = (document) => {
  return axios.post("http://localhost:8000/Documento/", document);
};
