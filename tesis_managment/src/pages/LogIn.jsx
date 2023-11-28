import { Container, Col, Row } from "react-bootstrap";
import FormLogIn from "../components/FormLogIn";

const LogIn = () => {
  return (
    <>
      <Container fluid className="p-5">
        <Row className="p-5">
          <Col className="p-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid m-5 "
              alt="Phone image"
            />
          </Col>

          <Col
            className="mx-5 alingth-item-center px-5 my-5 border border-3 border-black-subtle bg-opacity-10 rounded-4 shadow"
            style={{
              background: "radial-gradient(transparent, #ebeef3)", // Corregí la sintaxis aquí
            }}
          >
            <FormLogIn />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
