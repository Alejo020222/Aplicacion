import { Container, Col, Row, Button, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getUsuarios } from "../api/Login";

const LogIn = () => {
  const [usuarios, setUsuarios] = useState();

  useEffect(() => {
    async function buscarUser() {
      const res = await getUsuarios(6);
      setUsuarios(res.data);
    }
    buscarUser();
  }, []);
  console.log(usuarios);
  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col className="p-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid my-5"
              alt="Phone image"
            />
          </Col>

          <Col className="px-5 m-5 border border-3 border-black-subtle bg-opacity-10 rounded-4 shadow">
            <div className="text-center mb-5">
              <h1>Autentíquese Aquí</h1>
            </div>
            <InputGroup className="mb-4">
              <InputGroup.Text>Usuario</InputGroup.Text>
              <input
                type="text"
                className="form-control me-5"
                aria-label="Email address"
              />
            </InputGroup>

            <InputGroup className="mb-4">
              <InputGroup.Text>Contraseña</InputGroup.Text>
              <input
                type="password"
                className="form-control"
                aria-label="Password"
              />
            </InputGroup>

            <Button className="mb-4 w-100" size="lg">
              Aceptar
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
