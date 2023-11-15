import { useState } from "react";

// eslint-disable-next-line react/prop-types
const InfoEventDefensa = ({ allCortes }) => {
  const [corte] = useState(allCortes);
  return (
    <>
      <div className=" container p-2">
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">Fecha del Corte:</h5>
          <span className="ps-3  h5 fw-lighter ">{corte.fecha}</span>
        </div>
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">Evaluación del Corte:</h5>
          <span className="ps-3  h5 fw-lighter ">{corte.evaluacion}</span>
        </div>
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">URL Oficial del Documento:</h5>
          <span className="ps-3  h5 fw-lighter ">{corte.url}</span>
        </div>
      </div>
    </>
  );
};

export default InfoEventDefensa;
