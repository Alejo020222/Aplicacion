import { NavLink } from "react-router-dom";

import { Table, Pagination, Button, Container } from "react-bootstrap";

import { useState, useEffect } from "react";
import { getAllEstudent, deleteEstudent } from "../api/Estudiantes.api";
import ConfirModal from "../components/modal/ConfirmModal";

const GestEstud = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteID, setDeleteID] = useState();
  //////////////////////////////////////////////////////////////////
  const [student, setStudent] = useState([]);
  useEffect(() => {
    async function loadStudent() {
      const res = await getAllEstudent();
      setStudent(res.data);
    }
    loadStudent();
  }, []);

  /////////////////////////////////////////////////////////////
  // Eliminar Profesor con Modal
  const handleShowModal = (id) => {
    console.log(id);
    setDeleteID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deleteEstudent(deleteID);
    location.reload();
    setShowModal(false);
  };
  /////////////////////////////////////////////////////////////
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const paginacion = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(student.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const datosPaginados = student.slice(inicio, fin);

  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  return (
    <>
      {
        <ConfirModal
          show={showModal}
          onClose={() => setShowModal(false)}
          handleConfirm={handleDelete}
        />
      }
      <div className="container text-center">
        <NavLink
          to="/gestEstudent/estudentForm"
          className="btn btn-primary col-lg-6 col-md-4"
        >
          Añadir Estudiante
        </NavLink>
      </div>
      <div className="table-responsive mt-4 p-3">
        <Container className="text-center">
          <Table bordered striped hover className="mt-4">
            <thead>
              <tr className="table-header">
                <th>Nombre(s) del Estudiante</th>
                <th>Apellidos del Estudiante</th>
                <th>Carrera</th>
                <th>Año</th>
                <th>Solapín</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.map((estudiante) => (
                <tr key={estudiante.id}>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellidos}</td>
                  <td>{estudiante.carrera}</td>
                  <td>{estudiante.year}</td>
                  <td>{estudiante.solapin}</td>
                  <td className="d-flex lg-col-6">
                    <NavLink
                      className="btn btn-primary m-2"
                      to={`/gestEstudent/estudentForm/${estudiante.id}`}
                    >
                      Editar
                    </NavLink>

                    <Button
                      variant="danger"
                      className="m-2"
                      onClick={async () => {
                        handleShowModal(estudiante.id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>{" "}
        </Container>
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
  );
};

export default GestEstud;
