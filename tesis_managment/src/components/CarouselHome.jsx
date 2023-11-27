import { Carousel } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function CarouselHome() {
  return (
    <>
      <Carousel
        fade
        data-bs-theme="white"
        className="pb-5 mt-5 mb-5 img-fluid pt-5"
      >
        <Carousel.Item>
          <Image
            rounded
            className="d-block w-100"
            src="img/carousel-4.jpg"
            alt="img"
            style={{ height: "800px" }}
          />
          <Carousel.Caption>
            <h1
              className="text-white text-uppercase text-center"
              style={{ margin: "200px", letterSpacing: "5px" }}
            >
              Gestión de Tesis
            </h1>
            <h4>Sitio eficiente y seguro para todos </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            rounded
            className="d-block w-100"
            src="img/carousel-3.jpg"
            alt="img"
            style={{ height: "800px" }}
          />
          <Carousel.Caption>
            <h1
              className="text-white text-uppercase text-center"
              style={{ margin: "200px", letterSpacing: "5px" }}
            >
              Gestión de Tesis
            </h1>
            <h4>Disponible para cada usuario de nuestra facultad</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            rounded
            className="d-block w-100"
            src="img/carousel-1.jpg"
            alt="img"
            style={{ height: "800px" }}
          />
          <Carousel.Caption>
            <h1
              className="text-white text-uppercase text-center"
              style={{ margin: "200px", letterSpacing: "5px" }}
            >
              Gestión de Tesis
            </h1>
            <h4>Sitio eficiente y seguro para todos </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            rounded
            className="d-block w-100"
            src="img/carousel-2.jpg"
            alt="img"
            style={{ height: "800px" }}
          />
          <Carousel.Caption>
            <h1
              className="text-white text-uppercase text-center"
              style={{ margin: "200px", letterSpacing: "5px" }}
            >
              Gestión de Tesis
            </h1>
            <h4>Disponible para cada usuario de nuestra facultad</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CarouselHome;
