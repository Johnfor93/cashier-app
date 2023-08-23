// import React from 'react'
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const ModalKasirProduct = ({ show, setShow, product }) => {
  const [jumlah_barang, setJumlah_barang] = useState(product.jumlah_barang);
  const [hargaSatuan, setHargaSatuan] = useState(product.harga);
  const handleClose = () => setShow();

  const handleSave = async () => {
    product.jumlah_barang = jumlah_barang;
    product.harga = hargaSatuan;
    product.subtotal = jumlah_barang * hargaSatuan;

    console.log(product);

    let products = await JSON.parse(localStorage.getItem("items"));
    console.log(products);

    let newProducts = products.map((item, index) => (product.index == index ? product : item));
    console.log(newProducts);

    await localStorage.setItem("items", JSON.stringify(newProducts));

    setShow();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaksi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nama_barang">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control type="text" value={product.nama_barang} readOnly={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jumlah">
              <Form.Label>Jumlah Barang</Form.Label>
              <Form.Control type="number" value={jumlah_barang} onChange={(event) => setJumlah_barang(parseInt(event.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hargaSatuan">
              <Form.Label>Harga Satuan</Form.Label>
              <Form.Control type="number" value={hargaSatuan} onChange={(event) => setHargaSatuan(parseInt(event.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subtotal">
              <Form.Label>Subtotal</Form.Label>
              <Form.Control type="number" value={jumlah_barang * hargaSatuan} readOnly={true} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalKasirProduct.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  product: PropTypes.object,
};

export default ModalKasirProduct;
