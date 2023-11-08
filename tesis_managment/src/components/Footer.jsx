const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 px-sm-3 px-lg-5">
        <div className="row pt-5">
          <div className="col-lg-6 col-md-6">
            <a href="" className="navbar-brand">
              <h1 className="text-white">SISTEMA INFORMATICO</h1>
              <h1 className="text-primary">FACULTAD 2</h1>
            </a>
            <p>
              Formar profesionales comprometidos con su Patria y altamente
              calificados en la rama de la Informática, producir aplicaciones y
              servicios informáticos a partir del vínculo estudio – trabajo como
              modelo de formación – investigación - producción, sirviendo de
              soporte a la industria cubana de la Informática.
            </p>
          </div>
          <div className="col-lg-6 col-md-6">
            <h3
              className="text-white text-uppercase mb-4"
              style={{ letterSpacing: "5px" }}
            >
              CONTACTANOS
            </h3>
            <p>
              <i className="fa fa-map-marker-alt mr-2"></i> Carretera de San
              Antonio de los Baños, Km 2 1/2, Torrens, Cuba
            </p>
            <p>
              <i className="fa fa-phone-alt mr-2"></i> +53 7 837 2548 | +53 7
              837 2549
            </p>
            <p>
              <i className="fa fa-envelope mr-2"></i> uci@uci.cu
            </p>
          </div>
          <div className="text-center">
            <h3
              className="text-white text-uppercase mb-3"
              style={{ letterSpacing: "5px" }}
            >
              SIGUENOS
            </h3>
            <div className="d-flex justify-content-center mb-3">
              <a
                className="btn btn-outline-primary mr-2 mx-1"
                href="https://www.twitter.com/universidad_uci"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-outline-primary btn-square mr-2 mx-1"
                href="https://www.facebook.com/universidad.uci"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-outline-primary btn-square mr-2 mx-1"
                href="https://www.linkedin.com/school/15097469"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className="btn btn-outline-primary btn-square mx-1"
                href="https://www.instagram.com/universidad.uci/"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
