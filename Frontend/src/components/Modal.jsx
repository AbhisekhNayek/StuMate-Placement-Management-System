import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBox({ show, close, header, body, btn, confirmAction }) {
  return (
    <>
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="bg-dark text-green-500">
          <Modal.Title className="text-green-500">{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <p className="text-white">{body}</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button
            variant="secondary"
            onClick={close}
            style={{
              backgroundColor: '#6c757d',
              border: 'none',
              color: 'white',
            }}
            className="py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={confirmAction}
            style={{
              backgroundColor: '#dc3545',
              border: 'none',
            }}
            className="py-2 px-4 rounded-md hover:bg-red-700"
          >
            {btn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBox;
