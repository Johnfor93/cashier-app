// import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import TableKasirProduct from "./TableKasirProduct.jsx";

const ModalKasir = ({ show, setShow, products }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableKasirProduct products={products} setShow={setShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

ModalKasir.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  products: PropTypes.array,
};

export default ModalKasir;
