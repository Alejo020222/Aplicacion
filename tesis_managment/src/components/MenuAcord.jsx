import { getAllPrimCort } from "../api/PrimerCorte";
import EventModal from "../components/modal/modalEvent/EventModal";
import { useEffect, useState } from "react";
import InfoEvent from "./modal/modalEvent/InfoEvent";

// eslint-disable-next-line react/prop-types
const MenuAcord = ({ params }) => {
  const [tesisId] = useState(params);
  const [allCortes, setAllCortes] = useState();

  const [showModal] = useState(false);
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function PrimerCorte() {
      const res = await getAllPrimCort();
      if (res !== undefined) {
        const corte = res.data.find((item) => item.doc == tesisId.tesisId);
        setAllCortes(corte);
      }
    }
    PrimerCorte();
  }, [tesisId]);
  //   console.log(allCortes);
  return (
    <>
      <div className="container border border-3 border-black-subtle bg-opacity-10 rounded-4 shadow-lg p-5">
        <div className="">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Primer Corte del Documento
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {allCortes ? (
                    <InfoEvent allCortes={allCortes} />
                  ) : (
                    <EventModal showModal={showModal} params={params} />
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Segundo Corte del Documento
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">Contenido</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Predefensa del Documento
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">Contenido</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  Defensa del Documento
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">Contenido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAcord;
