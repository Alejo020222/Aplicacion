import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// eslint-disable-next-line react/prop-types
const AlertModal = ({ show, onClose, text }) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error en el Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${text}`}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Rectificar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlertModal;
