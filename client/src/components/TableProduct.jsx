import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const TableProduct = (props) => {
  return (
    <Table striped bordered={false} hover>
      <thead>
        <tr>
          <th scope="col">Nama Product</th>
          <th scope="col">Merek</th>
          <th scope="col">Type</th>
          <th scope="col">Stock</th>
          <th scope="col">Harga</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((item) => {
          return (
            <tr key={item.kodebarang}>
              <td scope="row">{item.nama_barang}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.jumlah}</td>
              <td>{item.harga}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

TableProduct.propTypes = {
  products: PropTypes.array,
};

export default TableProduct;
