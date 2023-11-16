const InfoEvent = ({ allCortes }) => {
  return (
    <>
      <div className=" container p-2">
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">Fecha del Corte:</h5>
          <span className="ps-3  h5 fw-lighter ">{allCortes.fecha}</span>
        </div>
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">Evaluación del Corte:</h5>
          <span className="ps-3  h5 fw-lighter ">{allCortes.evaluacion}</span>
        </div>
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">Documento Agregado:</h5>
          <span className="ps-3  h5 fw-lighter ">{allCortes.documento}</span>
        </div>
        <div className="d-flex my-auto">
          <h5 className=" text-uppercase">Recomendaciones:</h5>
          <span className="ps-3  h5 fw-lighter ">
            {allCortes.recomendaciones}
          </span>
        </div>
      </div>
    </>
  );
};

export default InfoEvent;
