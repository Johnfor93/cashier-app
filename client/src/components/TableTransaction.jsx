import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const TableTransaction = (props) => {
  return (
    <Table striped bordered={false} hover>
      <thead>
        <tr>
          <th scope="col">Nama Product</th>
          <th scope="col">Harga Satuan</th>
          <th scope="col">Jumlah</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Tanggal Transaksi</th>
        </tr>
      </thead>
      <tbody>
        {props.transaction.map((item) => {
          return (
            <tr key={item.id}>
              <td scope="row">{item.nama_barang}</td>
              <td>{item.jumlah_barang}</td>
              <td>{item.harga}</td>
              <td>{item.subtotal}</td>
              <td>{item.tanggal_transaksi}</td>
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
