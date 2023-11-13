import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocument } from "../api/Tesis.api";
import { getEstudent } from "../api/Estudiantes.api";
import { getProfesor } from "../api/Profesores.api";
import { getTribunal } from "../api/Tribunales.api";

import MenuAcord from "../components/MenuAcord";

const PersonalTes = () => {
  const params = useParams();
  const [document, setDocument] = useState([]);
  const [estudiante, setEstudiante] = useState([]);
  const [profesor, setProfesor] = useState([]);
  const [tribunal, setTribunal] = useState([]);
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
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
      }
      nombtribunales(res.data);
    }

    tesisActual(params);
  }, [params]);

  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  // console.log(estudiante.nombre, profesor.nombre, document.nombre);
  return (
    <>
      <div className="container border border-3 border-black-subtle bg-opacity-10 rounded-4 shadow-lg">
        <div className="p-4">
          <div className="d-flex my-auto">
            <h4 className=" text-uppercase">Fecha de Entrega:</h4>
            <span className="ps-3  h4 fw-lighter ">{document.fecha}</span>
          </div>
          <div className="d-flex my-auto">
            <h4 className=" text-uppercase">Nombre del Documento:</h4>
            <span className="ps-3 h4 fw-lighter">{document.nombre}</span>
          </div>
          <div className="d-flex my-auto">
            <h4 className="mt-2 text-uppercase">Nombre del Estudiante:</h4>
            <span className="ps-3 mt-auto h4 fw-lighter">
              {estudiante.nombre} {estudiante.apellidos}
            </span>
          </div>
          <div className="d-flex my-auto">
            <h4 className="mt-2 text-uppercase">Nombre del Tutor:</h4>
            <span className="ps-3 mt-auto h4 fw-lighter">
              {profesor.nombre} {profesor.apellidos}
            </span>
          </div>
          <div className="d-flex my-auto">
            <h4 className="mt-2 text-uppercase">Nombre del Co-Tutor:</h4>
            <span className="ps-3 mt-auto h4 fw-lighter">
              {document.cotutor}
            </span>
          </div>
          <h4 className="mt-2 text-uppercase">Tribunal Asignado:</h4>
          <div className="d-flex h6 container">
            <div className="col-lg-3">
              <h6 className="text-uppercase">Presidente:</h6>
              <p className="fw-lighter">{tribunal.presidente}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="text-uppercase">Secretario:</h6>
              <p className="fw-lighter">{tribunal.secretario}</p>
            </div>
            <div className=" col-lg-3">
              <h6 className="text-uppercase">Vocal:</h6>
              <p className="fw-lighter"> {tribunal.vocal}</p>
            </div>
            <div className=" col-lg-3">
              <h6 className="text-uppercase">Oponente:</h6>
              <p className="fw-lighter">{tribunal.oponente}</p>
            </div>
          </div>
          <h4 className="mt-2 text-uppercase">Resumen del Documento:</h4>
          <span className="mt-auto h4 fw-lighter">{document.resumen}</span>
        </div>
      </div>
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center">
          <MenuAcord params={params} />
        </div>
      </div>

      {/* <EventModal className="" showModal={showModal} /> */}
    </>
  );
};

export default PersonalTes;
