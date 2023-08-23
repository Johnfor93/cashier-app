import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const TableTransaction = (props) => {
  return (
    <Table striped bordered={false} hover className="table">
      <thead>
        <tr>
          <th scope="col">Nama Product</th>
          <th scope="col">Jumlah</th>
          <th scope="col">Harga Satuan</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Tanggal Transaksi</th>
        </tr>
      </thead>
      <tbody>
        {props.transaction.map((item, index) => {
          return (
            <tr key={index}>
              <td scope="row">{item.nama_barang}</td>
              <td>{item.jumlah_barang}</td>
              <td>{item.harga}</td>
              <td>{item.subtotal}</td>
              <td>{item.tanggal_transaksi.slice(0, 10)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

TableTransaction.propTypes = {
  transaction: PropTypes.array,
};

export default TableTransaction;
