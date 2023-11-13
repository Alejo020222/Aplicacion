import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addPrimerCort } from "../../../api/PrimerCorte";
import { useForm } from "react-hook-form";
// import { getDocument } from "../../../api/Tesis.api";

// eslint-disable-next-line react/prop-types
const EventModal = ({ showModal, params }) => {
  const [documentoActual] = useState(params);
  const [show, setShow] = useState(showModal);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  ///////////////////////////////////////////////////////

  // useEffect(() => {
  //   async function tesisActual(document) {
  //     const res = await getDocument(document);
  //     console.log(document);
  //     console.log(res);
  //   }
  //   tesisActual();
  // }, [document]);

  ///////////////////////////////////////////////////////
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////

  const onSubmit = handleSubmit(async (data) => {
    console.log(data.documento[0]);
    console.log(documentoActual);
    const formData = new FormData();
    formData.append("fecha", data.fecha);
    formData.append("evaluacion", data.evaluacion);
    formData.append("recomendaciones", data.recomendaciones);
    formData.append("documento", data.documento[0]);
    formData.append("doc", documentoActual.tesisId);
    await addPrimerCort(formData);
  });

  ///////////////////////////////////////////////////////
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Agregar Corte
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>Fechadel Corte:</Form.Label>
              <Form.Control
                type="date"
                {...register("fecha", { required: true })}
              />
              {errors.fecha && (
                <Form.Text className="text-danger">
                  Este campo es necesario
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="evaluacion">
              <Form.Label>Evaluacion del Corte:</Form.Label>
              <Form.Control
                type="number"
                max={5}
                min={2}
                placeholder="Introduce la nota del corte"
                {...register("evaluacion", { required: true })}
              />
              {errors.evaluacion && (
                <Form.Text className="text-danger">
                  Este campo es necesario
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="documento">
              <Form.Label>Agrega un Documento</Form.Label>
              <Form.Control
                type="file"
                {...register("documento", { required: true })}
              />
              {errors.documento && (
                <Form.Text className="text-danger">
                  Este campo es necesario
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="recomendaciones">
              <Form.Label>Recomendaciones:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("recomendaciones", { required: true })}
              />
              {errors.recomendaciones && (
                <Form.Text className="text-danger">
                  Este campo es necesario
                </Form.Text>
              )}
            </Form.Group>
            <div className="form-group d-flex mt-3 justify-content-end">
              <Button
                type="button"
                variant="danger"
                className="m-2"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              {/* {params.id ? (
            <Button type="submit" variant="success" className="m-2">
              Editar Estudiante
            </Button>
          ) : ( */}
              <Button type="submit" variant="success" className="m-2">
                Guardar
              </Button>
              {/* )} */}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventModal;
