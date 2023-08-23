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
          <Modal.Title>Cari Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100">
            <TableKasirProduct products={products} setShow={setShow} />
          </div>
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
