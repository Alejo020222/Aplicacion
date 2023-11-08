import { Link, NavLink } from "react-router-dom";
import { Table, Pagination, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllDocument } from "../api/Tesis.api";
import { getAllEstudent } from "../api/Estudiantes.api";
import { getAllProfesor } from "../api/Profesores.api";

const Repositorio = () => {
  const [document, setDocument] = useState([]);
  const [student, setStudent] = useState([]);

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

  //<______________></______________>//

  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const paginacion = (pagina) => {
    setPaginaActual(pagina);
  };

  const totalPaginas = Math.ceil(student.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const datosPaginados = document.slice(inicio, fin);

  /////////////////////////////////////////////////////////////
  // console.log(document);
  // console.log(student);
  // console.log(profesor);
  return (
    <>
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
                  <Link
                    to={`/tesis/document/${document.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {document.nombre}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/tesis/document/${document.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {document.fecha}
                  </Link>
                </td>
                <td></td>
                <td></td>
                <td className="d-flex lg-col-6">
                  <NavLink
                    className="btn btn-primary m-2"
                    to={`/tesis/add/${document.id}`}
                  >
                    Editar
                  </NavLink>

                  <Button variant="danger" className="m-2" onClick={() => {}}>
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
  );
};

export default Repositorio;
