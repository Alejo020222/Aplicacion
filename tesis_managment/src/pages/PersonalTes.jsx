import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocument } from "../api/Tesis.api";
import { getEstudent } from "../api/Estudiantes.api";
import { getProfesor } from "../api/Profesores.api";
import { getTribunal } from "../api/Tribunales.api";

const PersonalTes = () => {
  const params = useParams();
  const [document, setDocument] = useState([]);
  const [estudiante, setEstudiante] = useState([]);
  const [profesor, setProfesor] = useState([]);
  const [tribunal, setTribunal] = useState([]);
  //////////////////////////////////////////////////////////

  useEffect(() => {
    async function tesisActual(params) {
      const res = await getDocument(params.tesisId);
      setDocument(res.data);

      async function nombreEst(document) {
        const res = await getEstudent(document.est);
        setEstudiante(res.data);
      }

      nombreEst(res.data);
      async function nombreEProf(document) {
        const res = await getProfesor(document.profesor);
        setProfesor(res.data);
      }

      nombreEProf(res.data);

      async function nombtribunales(document) {
        const res = await getTribunal(document.tribunal);
        setTribunal(res.data);
        console.log(tribunal);
      }
      nombtribunales(res.data);
    }

    tesisActual(params);
  }, [params]);

  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  // console.log(estudiante.nombre, profesor.nombre, document.nombre);
  return (
    <div className="container">
      <div className="">
        <h3>Fecha de Entrega:</h3>
        <h5>{document.fecha}</h5>

        <h3>Nombre del Documento:</h3>
        <h5>{document.nombre}</h5>

        <h3>Nombre del Estudiante:</h3>
        <h5>
          {estudiante.nombre} {estudiante.apellidos}
        </h5>

        <h3 className="">Nombre del Tutor:</h3>
        <h5>
          {profesor.nombre} {profesor.apellidos}
        </h5>

        <h3 className="">Nombre del Co-Tutor:</h3>
        <h5>{document.cotutor}</h5>

        <h3>Tribunal Asignado:</h3>
        <h5>
          Presidente: {tribunal.presidente}, Secretario: {tribunal.secretario},
          Vocal: {tribunal.vocal}, Oponente: {tribunal.oponente}
        </h5>

        <h3>Resumen del Documento:</h3>
        <h5>{document.resumen}</h5>
      </div>
    </div>
  );
};

export default PersonalTes;
