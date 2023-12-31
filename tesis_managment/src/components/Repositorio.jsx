import { NavLink } from "react-router-dom";
import { Table, Pagination, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteDocument, getAllDocument } from "../api/Tesis.api";
import { getAllEstudent } from "../api/Estudiantes.api";
import { getAllProfesor } from "../api/Profesores.api";
import ConfirModal from "./modal/ConfirmModal";
// import { getAllProfesor } from "../api/Profesores.api";

const Repositorio = () => {
  const [document, setDocument] = useState([]);
  const [student, setStudent] = useState([]);
  const [profesor, setProfesor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteID, setDeleteID] = useState();
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadDocument() {
      const res = await getAllDocument();
      setDocument(res.data);
    }
    loadDocument();
  }, []);
  useEffect(() => {
    async function loadEstudent() {
      const res = await getAllEstudent();
      setStudent(res.data);
    }
    loadEstudent();
  }, []);
  useEffect(() => {
    async function loadProfesor() {
      const res = await getAllProfesor();
      setProfesor(res.data);
    }
    loadProfesor();
  }, []);
  /////////////////////////////////////////////////////////////
  function buscarEst(id) {
    const res = student.find((est) => est.id === id);
    return `${res.nombre} ${res.apellidos}`;
  }
  function buscarProf(id) {
    const res = profesor.find((prof) => prof.id === id);
    return `${res.nombre} ${res.apellidos}`;
  }
  /////////////////////////////////////////////////////////////
  const handleShowModal = (id) => {
    setDeleteID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deleteDocument(deleteID);
    location.reload();
    setShowModal(false);
  };
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;
  const totalPaginas = Math.ceil(student.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const datosPaginados = document.slice(inicio, fin);

  const paginacion = (pagina) => {
    setPaginaActual(pagina);
  };

  /////////////////////////////////////////////////////////////
  // console.log(estudiantesOptions);
  if (document.length === 0 || student.length === 0) {
    return (
      <div>
        <h1>Cargando datos...</h1>
      </div>
    );
  }
  return (
    <>
      {profesor.length === 0 || student.length === 0 ? (
        <h1>Cargando datos...</h1>
      ) : (
        <>
          {
            <ConfirModal
              show={showModal}
              onClose={() => setShowModal(false)}
              handleConfirm={handleDelete}
            />
          }
          <div className="table-responsive mt-4 p-3">
            <Table bordered striped hover className="mt-4">
              <thead>
                <tr className="table-header">
                  <th>Nombre de Tesis</th>
                  <th>Fecha</th>
                  <th>Estudiante(s)</th>
                  <th>Tutor</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {datosPaginados.map((document) => (
                  <tr style={{ cursor: "pointer" }} key={document.id}>
                    <td>
                      <NavLink
                        to={`/tesis/document/${document.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {document.nombre}
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/tesis/document/${document.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {document.fecha}
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/tesis/document/${document.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {`${buscarEst(document.est)}`}
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/tesis/document/${document.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {`${buscarProf(document.profesor)}`}
                      </NavLink>
                    </td>
                    <td className="d-flex lg-col-6">
                      <NavLink
                        className="btn btn-primary m-2"
                        to={`/tesis/add/${document.id}`}
                      >
                        Editar
                      </NavLink>

                      <Button
                        variant="danger"
                        className="m-2"
                        onClick={async () => {
                          handleShowModal(document.id);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: totalPaginas }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === paginaActual}
                onClick={() => paginacion(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
      )
    </>
  );
};

export default Repositorio;
