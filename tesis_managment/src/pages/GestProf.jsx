import { NavLink, useNavigate } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import { Pagination } from "react-bootstrap";

import { useState, useEffect } from "react";
import { getAllProfesor } from "../api/Profesores.api";
import { deletProfesor } from "../api/Profesores.api";
import ConfirModal from "../components/modal/ConfirmModal";

const GestProf = () => {
  const [showModal, setShowModal] = useState(false);
  const [profesor, setProfesor] = useState([]);
  const [deleteID, setDeleteID] = useState();
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadProfesor() {
      const res = await getAllProfesor();
      setProfesor(res.data);
    }
    loadProfesor();
  }, []);

  /////////////////////////////////////////////////////////////
  // Eliminar Profesor con Modal
  const handleShowModal = (id) => {
    console.log(id);
    setDeleteID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deletProfesor(deleteID);
    location.reload();
    setShowModal(false);
  };
  /////////////////////////////////////////////////////////////

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const paginacion = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(profesor.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const datosPaginados = profesor.slice(inicio, fin);

  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  const navigate = useNavigate();
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
          to="/gestProfesor/profesorForm"
          className="btn btn-primary col-lg-6 col-md-4"
        >
          Añadir Profesor
        </NavLink>
      </div>
      <div>
        <div className="table-responsive mt-4 p-3">
          <Container className="text-center">
            <Table bordered striped hover className="mt-4">
              <thead>
                <tr className="table-header">
                  <th>Categoria</th>
                  <th>Titulacion</th>
                  <th>Nombre(s) del Profesor</th>
                  <th>Apellidos del Profesor</th>
                  <th>Area</th>
                  <th>Solapín</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {datosPaginados.map((profesor) => (
                  <tr key={profesor.id}>
                    <td>{profesor.categoria}</td>
                    <td>{profesor.titulacion}</td>
                    <td>{profesor.nombre}</td>
                    <td>{profesor.apellidos}</td>
                    <td>{profesor.area}</td>
                    <td>{profesor.solapin}</td>
                    <td className="d-flex lg-col-6 justify-content-center ">
                      <Button
                        className="btn btn-primary m-2"
                        onClick={() => {
                          navigate(`profesorForm/${profesor.id}`);
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        className="m-2"
                        onClick={() => {
                          handleShowModal(profesor.id);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
      </div>
      <ConfirModal />
    </>
  );
};

export default GestProf;
