import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const TableTransaction = (props) => {
  const handlerClick = (index) => {
    console.log(props.items[index]);
  };
  return (
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
        {props.items.map((item, index) => {
          return (
            <tr key={index}>
              <td scope="row">{item.nama_barang}</td>
              <td>{item.jumlah_barang}</td>
              <td>{item.harga}</td>
              <td>{item.subtotal}</td>
              <td>
                <Button variant="primary" onClick={handlerClick(index)}>
                  Edit
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

TableTransaction.propTypes = {
  items: PropTypes.array,
};

export default TableTransaction;
