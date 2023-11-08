import axios from "axios";
export const getAllTribunal = () => {
  return axios.get("http://localhost:8000/Tribunal/");
};
export const getTribunal = async (id) => {
  return await axios.get(`http://localhost:8000/Tribunal/${id}/`);
};
export const deletTribunal = async (id) => {
  return await axios.delete(`http://localhost:8000/Tribunal/${id}/`);
};
export const updateTribunal = async (id, tribunal) => {
  return await axios.put(`http://localhost:8000/Tribunal/${id}/`, tribunal);
};

export const addTribunal = async (tribunal) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/Tribunal/",
      tribunal
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar tribunal:", error);
    throw error;
  }
};
