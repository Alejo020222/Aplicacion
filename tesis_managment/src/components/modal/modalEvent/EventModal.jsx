import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addPrimerCort } from "../../../api/PrimerCorte";
import { useForm } from "react-hook-form";
// import { getDocument } from "../../../api/Tesis.api";

const EventModal = ({ showModal, params, loadPrimerCorte }) => {
  const [documentoActual] = useState(params);
  const [show, setShow] = useState(showModal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  ///////////////////////////////////////////////////////
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("fecha", data.fecha);
    formData.append("evaluacion", data.evaluacion);
    formData.append("recomendaciones", data.recomendaciones);
    formData.append("documento", data.documento[0]);
    formData.append("doc", documentoActual.tesisId);
    await addPrimerCort(formData);
    loadPrimerCorte();
  });

  ///////////////////////////////////////////////////////

  return (
    <>
      <Button className="col-lg-6 btn-primary" onClick={handleShow}>
        Agregar Primer Corte
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Primer Corte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>Fecha del Primer Corte:</Form.Label>
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
              <Form.Label>Evaluación del Primer Corte:</Form.Label>
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
              <Form.Label>Recomendaciones del Primer Corte:</Form.Label>
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
              <Button
                type="submit"
                variant="success"
                className="m-2"
                onClick={() => {
                  if (!Object.keys(errors).length) {
                    handleClose();
                  }
                }}
              >
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
