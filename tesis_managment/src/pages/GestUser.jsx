import { NavLink } from "react-router-dom";
import { Table, Pagination, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ConfirModal from "../components/modal/ConfirmModal";
import { deleteUsuarios, getAllUsuarios } from "../api/Login";

const GestUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteID, setDeleteID] = useState();
  //////////////////////////////////////////////////////////////////
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    async function loadStudent() {
      const res = await getAllUsuarios();
      setUsuarios(res.data);
    }
    loadStudent();
  }, []);

  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  // Eliminar Profesor con Modal
  const handleShowModal = (id) => {
    console.log(id);
    setDeleteID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deleteUsuarios(deleteID);
    location.reload();
    setShowModal(false);
  };
  /////////////////////////////////////////////////////////////
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const paginacion = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const datosPaginados = usuarios.slice(inicio, fin);

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
          to="/gestUsers/FormUser"
          className="btn btn-primary col-lg-6 col-md-4"
        >
          Añadir Usuario
        </NavLink>
      </div>
      <div className="table-responsive mt-4 p-3">
        <Container className="text-center ">
          <Table bordered striped hover className="mt-4">
            <thead>
              <tr className="table-header">
                <th>ID de Usuario</th>
                <th>Nombre de Usuario</th>
                <th>Contraseña</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.map((usuarios) => (
                <tr key={usuarios.id}>
                  <td>{usuarios.id}</td>
                  <td>{usuarios.username}</td>
                  <td>{usuarios.password}</td>
                  <td className="d-flex lg-col-6">
                    <NavLink
                      className="btn btn-primary m-2"
                      to={`/gestUsers/FormUser/${usuarios.id}`}
                    >
                      Editar
                    </NavLink>

                    <Button
                      variant="danger"
                      className="m-2"
                      onClick={async () => {
                        handleShowModal(usuarios.id);
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
    </>
  );
};

export default GestUser;
