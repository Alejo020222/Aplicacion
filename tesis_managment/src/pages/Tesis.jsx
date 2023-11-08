import { NavLink } from "react-router-dom";
import Repositorio from "../components/Repositorio";

const Tesis = () => {
  return (
    <>
      <div className="container text-center">
        <NavLink to="add" className="btn btn-primary col-lg-6 col-md-4">
          Añadir Tesis
        </NavLink>
      </div>
      <Repositorio />
    </>
  );
};

export default Tesis;
