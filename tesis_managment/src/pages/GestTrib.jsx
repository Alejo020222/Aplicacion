import { NavLink, useNavigate } from "react-router-dom";
import { getAllTribunal, deletTribunal } from "../api/Tribunales.api";
import { useState, useEffect } from "react";
import { Button, Container, Pagination, Table } from "react-bootstrap";
import ConfirModal from "../components/modal/ConfirmModal";

const GestTrib = () => {
  const [showModal, setShowModal] = useState(false);
  const [tribunal, setTribunal] = useState([]);
  const [deleteID, setDeleteID] = useState();
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    return () => {
      async function loadTribunal() {
        const res = await getAllTribunal();
        setTribunal(res.data);
      }
      loadTribunal();
    };
  }, []);

  /////////////////////////////////////////////////////////////
  const handleShowModal = (id) => {
    console.log(id);
    setDeleteID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await deletTribunal(deleteID);
    location.reload();
    setShowModal(false);
  };
  /////////////////////////////////////////////////////////////

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const paginacion = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(tribunal.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const datosPaginados = tribunal.slice(inicio, fin);

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
          to="/gestTribunal/tribunalForm"
          className="btn btn-primary col-lg-6 col-md-4"
        >
          Añadir Tribunal
        </NavLink>
      </div>
      <div>
        <div className="table-responsive mt-4 p-3">
          <Container className="text-center">
            <Table bordered striped hover className="mt-4">
              <thead>
                <tr className="table-header">
                  <th>Profesor Presidente</th>
                  <th>Profesor Secretario</th>
                  <th>Profesor Vocal</th>
                  <th>Profesor Oponente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {datosPaginados.map((tribunal) => (
                  <tr key={tribunal.id}>
                    <td>{tribunal.presidente}</td>
                    <td>{tribunal.secretario}</td>
                    <td>{tribunal.vocal}</td>
                    <td>{tribunal.oponente}</td>

                    <td className="d-flex lg-col-6 justify-content-center ">
                      <Button
                        className="btn btn-primary m-2"
                        onClick={() => {
                          navigate(`tribunalForm/${tribunal.id}`);
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        className="m-2"
                        onClick={() => {
                          handleShowModal(tribunal.id);
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
    </>
  );
};

export default GestTrib;
