import { getAllEstudent } from "../api/Estudiantes.api";
import { getAllDocument } from "../api/Tesis.api";

import { useState, useEffect } from "react";
const PersonalTes = () => {
  const [estudent, setEstudent] = useState([]);
  const [document, setDocument] = useState([]);
  useEffect(() => {
    async function loadEstudent() {
      const res = await getAllEstudent();
      setEstudent(res.data);
    }
    loadEstudent();
  }, []);

  useEffect(() => {
    async function loadDocument() {
      const res = await getAllDocument();
      setDocument(res.data);
    }
    loadDocument();
  }, []);

  return (
    <>
      {estudent.map((estudiantes) => (
        <div key={estudiantes.id}>
          <h1>{estudiantes.nombre}</h1>
        </div>
      ))}
      {document.map((document) => (
        <div key={document.id}>
          <h1>{document.nombre}</h1>
        </div>
      ))}
    </>
  );
};

export default PersonalTes;

// black box
//
//
//
//  // const buscarTesis = (tesisId) => {
//   const resultado = tesis.filter((tesis) => tesis.id === tesisId);
//   useTesisStore.getState();
// };

// useEffect(() => {
//   const buscarTesis = () => {
//     const tesisEncontrada = useTesisStore
//       .getState()
//       .find((openTesis) => openTesis.id === tesisId);
//     setOpenTesis(tesisEncontrada);
//   };

//   buscarTesis();
// }, [tesisId]);

//   const buscarTesis = (tesisId) => {
//     const nuevasTesis = tesis.filter((tesis) => tesis.id === tesisId);
//     useTesisStore.getState().setTesis(nuevasTesis);
//     setOpenTesis(nuevasTesis);
//   };
//   setOpenTesis(buscarTesis);

//   const buscarTesis = (tesisId) => {
//     const nuevasTesis = tesis.find((tesis) => tesis.id === tesisId);
//     useTesisStore.getState().setTesis(nuevasTesis);
//   };

//   console.log(openTesis);
//   console.log(tesis);
//
//
//
//
//
//
//
//     <>
//       <div className="px-4">
//         <div>
//           <h6>ID de registro:</h6>
//           <p className="px-2">{tesisId}</p>
//           <p className="px-2">{}</p>
//         </div>
//         <div>
//           <h6>Nombre de la Tesis:</h6>
//           <p className="px-2">{}</p>
//         </div>
//         <div>
//           <h6>Nombre de Autor(es):</h6>
//           <p className="px-2">{}</p>
//         </div>
//         <div>
//           <h6>Fecha de Agregada:</h6>
//           <p className="px-2">{}</p>
//         </div>
//         <div>
//           <h6>Nombre de Tutor:</h6>
//           <p className="px-2">{}</p>
//         </div>
//         <div>
//           <h6>Resumen de la Tesis:</h6>
//           <p className="px-2">{}</p>
//         </div>
//       </div>
//     </>
