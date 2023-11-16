import { getAllPrimCort } from "../api/PrimerCorte";
import EventModal from "../components/modal/modalEvent/EventModal";
import { useEffect, useState } from "react";
import InfoEvent from "./modal/modalEvent/InfoEvent";
import { getAllSegCort } from "../api/SegundoCorte";
import { getAllPredefensa } from "../api/Predefensa";
import EventModalSegCorte from "./modal/modalEvent/EventModalSegCorte";
import EventPredef from "./modal/modalEvent/EventPredef";
import EventDefensa from "./modal/modalEvent/EventDefensa";
import { getAllDefensa } from "../api/Defensa";
import InfoEventDefensa from "./modal/modalEvent/InfoEventDefensa";

const MenuAcord = ({ params }) => {
  const [tesisId] = useState(params);
  const [primCorte, setPrimCorte] = useState();
  const [segCorte, setSegCorte] = useState();
  const [predefensa, setPredefensa] = useState();
  const [defensa, setDefensa] = useState();

  const [showModal] = useState(false);
  ////////////////////////////////////////////////////////////////////
  async function loadPrimerCorte() {
    const res = await getAllPrimCort();
    if (res !== undefined) {
      const event = res.data.find((item) => item.doc == tesisId.tesisId);
      setPrimCorte(event);
    }
  }
  async function loadSegundoCorte() {
    const res = await getAllSegCort();
    if (res !== undefined) {
      const event = res.data.find((item) => item.doc == tesisId.tesisId);
      setSegCorte(event);
    }
  }
  async function loadPredefensa() {
    const res = await getAllPredefensa();
    if (res !== undefined) {
      const event = res.data.find((item) => item.doc == tesisId.tesisId);
      setPredefensa(event);
    }
  }
  async function loadDefensa() {
    const res = await getAllDefensa();
    if (res !== undefined) {
      const event = res.data.find((item) => item.doc == tesisId.tesisId);
      setDefensa(event);
    }
  }
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    loadPrimerCorte();
    loadSegundoCorte();
    loadPredefensa();
    loadDefensa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tesisId]);

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
                  {primCorte ? (
                    <InfoEvent allCortes={primCorte} />
                  ) : (
                    <EventModal
                      showModal={showModal}
                      params={params}
                      loadPrimerCorte={loadPrimerCorte}
                    />
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
                <div className="accordion-body">
                  {segCorte ? (
                    <InfoEvent allCortes={segCorte} />
                  ) : (
                    <EventModalSegCorte
                      showModal={showModal}
                      params={params}
                      loadSegundoCorte={loadSegundoCorte}
                    />
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
                <div className="accordion-body">
                  {predefensa ? (
                    <InfoEvent allCortes={predefensa} />
                  ) : (
                    <EventPredef
                      showModal={showModal}
                      params={params}
                      loadPredefensa={loadPredefensa}
                    />
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
                <div className="accordion-body">
                  {" "}
                  {defensa ? (
                    <InfoEventDefensa allCortes={defensa} />
                  ) : (
                    <EventDefensa
                      showModal={showModal}
                      params={params}
                      loadDefensa={loadDefensa}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAcord;
