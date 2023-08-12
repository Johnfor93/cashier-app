import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ModalEditProduct = ({ show, handleClose, product }) => {
  const [kodeBarang, setKodeBarang] = useState(product.kodebarang);
  const [kategoriBarang, setKategoriBarang] = useState(product.kategori_barang);
  const [tipeBarang, setTipeBarang] = useState(product.model);
  const [jumlah_barang, setJumlah_barang] = useState(product.jumlah);
  const [hargaSatuan, setHargaSatuan] = useState(product.harga);
  const [MerekBarang, setMerekBarang] = useState(product.brand);

  const handleSave = async () => {
    const product = {
      kodeBarang: kodeBarang,
      nama: `${kategoriBarang.toUpperCase()} ${MerekBarang.toUpperCase()} ${tipeBarang.toUpperCase()}`,
      kategoriBarang: kategoriBarang.toUpperCase(),
      brand: MerekBarang.toUpperCase(),
      model: tipeBarang.toUpperCase(),
      jumlah: jumlah_barang,
      harga: hargaSatuan,
    };
    const response = await fetch(`http://localhost:3000/api/updateItem/${kodeBarang}`, {
      method: "PUT",
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
          <Modal.Title>Edit Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nama_barang">
              <Form.Label>Kode Barang</Form.Label>
              <Form.Control type="text" placeholder="Jam Tangan, Baterai Jam, Jam Dinding" onChange={(event) => setKodeBarang(event.target.value)} value={kodeBarang} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nama_barang">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control type="text" placeholder="Jam Tangan, Baterai Jam, Jam Dinding" onChange={(event) => setKategoriBarang(event.target.value)} value={kategoriBarang} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="merek">
              <Form.Label>Merek</Form.Label>
              <Form.Control type="text" onChange={(event) => setMerekBarang(event.target.value)} value={MerekBarang} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Tipe</Form.Label>
              <Form.Control type="text" onChange={(event) => setTipeBarang(event.target.value)} value={tipeBarang} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jumlah">
              <Form.Label>Jumlah Barang</Form.Label>
              <Form.Control type="number" onChange={(event) => setJumlah_barang(parseInt(event.target.value))} value={jumlah_barang} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hargaSatuan">
              <Form.Label>Harga Satuan</Form.Label>
              <Form.Control type="number" onChange={(event) => setHargaSatuan(parseInt(event.target.value))} value={hargaSatuan} />
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

ModalEditProduct.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  product: PropTypes.object,
};

export default ModalEditProduct;
