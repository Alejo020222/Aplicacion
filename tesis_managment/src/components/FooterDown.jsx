import { Container, Row, Col } from "react-bootstrap";

const FooterDownHome = () => {
  return (
    <div
      className="bg-dark text-white border-top px-sm-3 px-md-5"
      style={{
        borderColor: "rgba(256, 256, 256, .1) !important",
        padding: "20px",
        marginTop: "0%",
      }}
    >
      <Container>
        <Row>
          <Col lg={12} className="text-center mb-3 mt-3 mb-md-0">
            <a className="m-0 text-white-50" href="https://www.uci.cu/#header">
              Universidad de las Ciencias Informáticas La Habana, Cuba. &copy;
            </a>
            <p>Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterDownHome;
