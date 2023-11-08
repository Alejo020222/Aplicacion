import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line react/prop-types
function ConfirModal({ show, onClose, handleConfirm }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal" // Agrega una clase CSS al diálogo del modal
    >
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Campo</Modal.Title>
      </Modal.Header>
      <Modal.Body>Esta seguro que decea eliminar este campo?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirModal;
