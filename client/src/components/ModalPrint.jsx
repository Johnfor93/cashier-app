import { useRef } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useReactToPrint } from "react-to-print";
import "./print.css";

const ModalPrint = ({ show, handleClose, handleSave, products }) => {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  let month = months[mm];
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + " " + month + " " + yyyy;
  let total = 0;
  const componentRef = useRef();
  const handlerPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Nota Tunas Jaya",
    onAfterPrint: () => {
      handleSave();
    },
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nota</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={componentRef}>
        <div className="p-4 print-content">
          <div className="text-center">
            <h5 className="mb-2 text-center">Toko Tunas Jaya</h5>
            <small className="text-center">Jl. Panglima Sudirman No.260, Pangongangan, Kec. Manguharjo, Kota Madiun</small>
            <br />
            <small className="text-center">No. Telepon: </small>
          </div>
          <hr />
          <div className="text-end mb-4">
            <small>Tanggal Transaksi: {formattedToday}</small>
          </div>
          <Table striped bordered={false} hover>
            <thead>
              <tr>
                <th scope="col">Nama Product</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga Satuan</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                total += item.subtotal;
                return (
                  <tr key={item.index}>
                    <td scope="row">{item.nama_barang}</td>
                    <td>{item.jumlah_barang}</td>
                    <td>{item.harga}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={3} className="text-end">
                  Total
                </td>
                <td>{total}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handlerPrint()}>
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalPrint.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  products: PropTypes.array,
};

export default ModalPrint;
