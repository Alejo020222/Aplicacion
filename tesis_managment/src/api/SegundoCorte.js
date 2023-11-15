import axios from "axios";

export const getAllSegCort = () => {
  return axios.get("http://localhost:8000/SegundoCorte/");
};
export const addSegCort = (segundoCorte) => {
  return axios.post("http://localhost:8000/SegundoCorte/", segundoCorte);
};
export const deleteSegCort = async (id) => {
  return await axios.delete(`http://localhost:8000/SegundoCorte/${id}/`);
};
export const getSegCort = async (id) => {
  return await axios.get(`http://localhost:8000/SegundoCorte/${id}/`);
};
export const updateSegCort = async (id, segundoCorte) => {
  return await axios.put(
    `http://localhost:8000/SegundoCorte/${id}/`,
    segundoCorte
  );
};
