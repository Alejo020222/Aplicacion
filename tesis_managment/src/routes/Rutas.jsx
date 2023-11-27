import { BrowserRouter, Route, Routes } from "react-router-dom";
import Repositorio from "../components/Repositorio";
import Formulario from "../components/Formulario";

import Home from "../pages/Home";
import Tesis from "../pages/Tesis";
import Layout from "../layout/Layout";
import PersonalTes from "../pages/PersonalTes";
import GestEstud from "../pages/GestEstud";
import GestProf from "../pages/GestProf";
import FormularioEst from "../components/FormularioEst";
import FormularioProf from "../components/FormularioProf";
import GestTrib from "../pages/GestTrib";
import FormularioTrib from "../components/FormularioTrib";
import LogIn from "../pages/LogIn";

function Rutas() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* Estudent Routes /////////////////////////////////////////////////*/}
            <Route path="/login" element={<LogIn />} />
            {/* Estudent Routes /////////////////////////////////////////////////*/}
            <Route path="/gestEstudent" element={<GestEstud />} />
            <Route
              path="/gestEstudent/estudentForm"
              element={<FormularioEst />}
            />
            <Route
              path="/gestEstudent/estudentForm/:id"
              element={<FormularioEst />}
            />
            {/* Profesor Routes///////////////////////////////////////////////// */}
            <Route path="/gestProfesor" element={<GestProf />} />
            <Route
              path="/gestProfesor/profesorForm"
              element={<FormularioProf />}
            />
            <Route
              path="/gestProfesor/profesorForm/:id"
              element={<FormularioProf />}
            />
            {/* Tribunal Routes /////////////////////////////////////////////////*/}
            <Route path="/gestTribunal" element={<GestTrib />} />
            <Route
              path="/gestTribunal/tribunalForm"
              element={<FormularioTrib />}
            />
            <Route
              path="/gestTribunal/tribunalForm/:id"
              element={<FormularioTrib />}
            />
            {/* Document Routes///////////////////////////////////////////////// */}
            <Route path="/repositorio" element={<Repositorio />} />
            <Route path="/tesis" element={<Tesis />} />
            <Route path="/tesis/add" element={<Formulario />} />
            <Route path="/tesis/add/:tesisId" element={<Formulario />} />
            <Route path="/tesis/document/:tesisId" element={<PersonalTes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rutas;
