import axios from "axios";

export const addPrimerCort = (primerCorte) => {
  return axios.post("http://localhost:8000/PrimerCorte/", primerCorte);
};
export const deletePrimerCort = async (id) => {
  return await axios.delete(`http://localhost:8000/PrimerCorte/${id}/`);
};
export const getPrimerCort = async (id) => {
  return await axios.get(`http://localhost:8000/PrimerCorte/${id}/`);
};
export const updatePrimerCort = async (id, primerCorte) => {
  return await axios.put(
    `http://localhost:8000/PrimerCorte/${id}/`,
    primerCorte
  );
};
