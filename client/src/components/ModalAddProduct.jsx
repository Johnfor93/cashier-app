import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const ModalAddProduct = ({ show, handleClose }) => {
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [tipeBarang, setTipeBarang] = useState("");
  const [jumlah_barang, setJumlah_barang] = useState(0);
  const [hargaSatuan, setHargaSatuan] = useState(0);
  const [MerekBarang, setMerekBarang] = useState("");

  const handleSave = async () => {
    const product = {
      nama: `${kategoriBarang.toUpperCase()} ${MerekBarang.toUpperCase()} ${tipeBarang.toUpperCase()}`,
      brand: MerekBarang.toUpperCase(),
      model: tipeBarang.toUpperCase(),
      jumlah: jumlah_barang,
      harga: hargaSatuan,
    };

    const response = await fetch("http://localhost:3000/api/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const result = await response.json();
    if (result.error) {
      return;
    }
    console.log(result);

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nama_barang">
              <Form.Label>Kategori Barang</Form.Label>
              <Form.Control type="text" placeholder="Jam Tangan, Baterai Jam, Jam Dinding" onChange={(event) => setKategoriBarang(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jumlah">
              <Form.Label>Jumlah Barang</Form.Label>
              <Form.Control type="number" onChange={(event) => setJumlah_barang(parseInt(event.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hargaSatuan">
              <Form.Label>Harga Satuan</Form.Label>
              <Form.Control type="number" onChange={(event) => setHargaSatuan(parseInt(event.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="merek">
              <Form.Label>Merek</Form.Label>
              <Form.Control type="text" onChange={(event) => setMerekBarang(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Tipe</Form.Label>
              <Form.Control type="text" onChange={(event) => setTipeBarang(event.target.value)} />
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

ModalAddProduct.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ModalAddProduct;
