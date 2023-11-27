import { Container, Row, Col, Button } from "react-bootstrap";

const AboutSection = () => {
  return (
    <div className="container-fluid py-5">
      <Container className="pt-0">
        <Row>
          <Col lg={6} style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100"
                src="img/about.jpg"
                style={{ objectFit: "cover" }}
                alt="Descripción de la imagen"
              />
            </div>
          </Col>
          <Col lg={6} className="pt-5 pb-lg-5">
            <div className="about-text bg-white p-4 p-lg-5 my-lg-5">
              <h6
                className="text-primary text-uppercase"
                style={{ letterSpacing: "5px" }}
              >
                Acerca de Nosotros
              </h6>
              <h1 className="mb-3">
                Principales Servicios de la UCI y la Facultad 2
              </h1>
              <p>
                Ofrecemos servicios académicos que incluyen programas de alta
                calidad en diferentes modalidades de estudio y diversos temas
                como la informática, las ciencias pedagógicas, y la matemática
                vinculada a la computación.También impartimos doctorados,
                maestrías, diplomados, cursos cortos, entrenamientos, así como
                pasantías y estancias que propician el desarrollo de proyectos
                investigativos.
              </p>
              <Row className="mb-4">
                <Col xs={6}>
                  <img
                    className="img-fluid"
                    src="img/about-1.jpg"
                    alt="Descripción de la imagen"
                  />
                </Col>
                <Col xs={6}>
                  <img
                    className="img-fluid"
                    src="img/about-2.jpg"
                    alt="Descripción de la imagen"
                  />
                </Col>
              </Row>
              <Button
                href="https://www.uci.cu/entre-los-mejores-blogs-de-software-libre-humanos-de-la-uci"
                target="_blank"
                rel="noopener noreferrer" // Agrega esto por razones de seguridad
                className="btn btn-primary mt-1"
              >
                Visita nuestro Blog
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AboutSection;
