import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import ModalKasirProduct from "./ModalKasirProduct";
import { useState } from "react";

const TableTransaction = (props) => {
  const [show, setShow] = useState(false);

  const handlerClick = async (item) => {
    console.log(item);
    await setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      <Table striped bordered={false} hover>
        <thead>
          <tr>
            <th scope="col">Nama Product</th>
            <th scope="col">Jumlah</th>
            <th scope="col">Harga Satuan</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => {
            return (
              <tr key={item.index}>
                <td scope="row">{item.nama_barang}</td>
                <td>{item.jumlah_barang}</td>
                <td>{item.harga}</td>
                <td>{item.subtotal}</td>
                <td>
                  <Button variant="primary" onClick={() => handlerClick(item)}>
                    Edit
                  </Button>
                </td>
                <ModalKasirProduct show={show} setShow={() => handleCloseModal()} product={item} />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

TableTransaction.propTypes = {
  items: PropTypes.array,
};

export default TableTransaction;
