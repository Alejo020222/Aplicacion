import axios from "axios";
export const getAllProfesor = async () => {
  return await axios.get("http://localhost:8000/Profesor/");
};
export const getProfesor = async (id) => {
  return await axios.get(`http://localhost:8000/Profesor/${id}/`);
};
export const deletProfesor = async (id) => {
  return await axios.delete(`http://localhost:8000/Profesor/${id}/`);
};
export const updateProfesor = async (id, profesor) => {
  return await axios.put(`http://localhost:8000/Profesor/${id}/`, profesor);
};

export const addProfesor = async (profesor) => {
  try {
    console.log("profesor:", profesor);
    const response = await axios.post(
      "http://localhost:8000/Profesor/",
      profesor
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar tribunal:", error);

    throw error;
  }
};
