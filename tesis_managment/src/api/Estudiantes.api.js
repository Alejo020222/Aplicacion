import axios from "axios";
export const getAllEstudent = async () => {
  return await axios.get("http://localhost:8000/Estudiante/");
};

export const deleteEstudent = async (id) => {
  return await axios.delete(`http://localhost:8000/Estudiante/${id}/`);
};
export const getEstudent = async (id) => {
  return await axios.get(`http://localhost:8000/Estudiante/${id}/`);
};
export const updateEstudent = async (id, student) => {
  return await axios.put(`http://localhost:8000/Estudiante/${id}/`, student);
};
export const addEstudent = async (student) => {
  try {
    console.log("student:", student);
    const response = await axios.post(
      "http://localhost:8000/Estudiante/",
      student
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar student:", error);
    throw error;
  }
};
