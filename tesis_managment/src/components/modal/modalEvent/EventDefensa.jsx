import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { addDefensa } from "../../../api/Defensa";

// import { getDocument } from "../../../api/Tesis.api";

// eslint-disable-next-line react/prop-types
const EventDefensa = ({ showModal, params, loadDefensa }) => {
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
    const formData = {
      fecha: data.fecha,
      evaluacion: data.evaluacion,
      url: data.url,
      doc: documentoActual.tesisId,
    };
    await addDefensa(formData);
    loadDefensa();
  });

  ///////////////////////////////////////////////////////
  return (
    <>
      <Button className="col-lg-6 btn-primary" onClick={handleShow}>
        Agregar Defensa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Defensa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>Fecha de la Defensa:</Form.Label>
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
              <Form.Label>Evaluación de la Defensa:</Form.Label>
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
            <Form.Group className="mb-3" controlId="url">
              <Form.Label>URL Oficial:</Form.Label>
              <Form.Control
                type="url"
                {...register("url", { required: true })}
              />
              {errors.url && (
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
                onClick={handleClose}
                disabled={Object.keys(errors).length > 0}
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

export default EventDefensa;
