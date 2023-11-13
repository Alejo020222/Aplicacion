// import { NavLink } from "react-router-dom";

import { NavLink } from "react-router-dom";

const HeaderAppBar = () => {
  return (
    <>
      {/* <!-- Topbar Start --> */}
      <div className="container-white bg-dark pt-3 d-none d-lg-block text-light ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <p>
                  <i className="fa fa-envelope mr-2"></i>uci@uci.cu
                </p>
                <p className="text-body px-3">|</p>
                <p>
                  <i className="fa fa-phone-alt mr-2"></i>+53 7 837 2548 | +53 7
                  837 2549
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
              <div className="d-flex justify-content-center mb-3">
                <a
                  className=" text-primary mx-1 px-3 border border-info rounded"
                  href="https://www.facebook.com/universidad.uci"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="text-primary mx-1 px-3 border border-info rounded btn-outline-primary"
                  href="https://www.twitter.com/universidad_uci"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="text-primary mx-1 px-3 border border-info rounded btn-outline-primary"
                  href="https://www.linkedin.com/school/15097469"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  className="text-primary mx-1 px-3 border border-info rounded btn-outline-primary"
                  href="https://www.instagram.com/universidad.uci/"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="text-primary mx-1 px-3 border border-info rounded btn-outline-primary"
                  href="http://www.youtube.com/user/informativouci?feature=BF"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End -->

    <!-- Navbar Start --> */}
      <nav className="navbar navbar-expand-lg mb-5 bg-body-tertiary navbar-expand-lg bg-light navbar-light shadow-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-primary" to="/">
            <h1>
              Gestión de Tesis <span className="text-dark">Facultad 2</span>
            </h1>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link active ps-5"
                  aria-current="page"
                  to="/repositorio"
                >
                  Documento
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link active btn btn-light"
                  aria-current="page"
                  to="/tesis"
                >
                  Agregar Tesis
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle mx-2 h2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gestionar Usuarios
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/gestEstudent">
                      Gestionar Estudiantes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/gestProfesor">
                      Gestionar Profesores
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/gestTribunal">
                      Gestionar Tribunales
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar...."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* ////////////////////// */}
    </>
  );
};
export default HeaderAppBar;
