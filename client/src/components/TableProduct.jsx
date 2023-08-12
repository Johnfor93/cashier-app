import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const TableProduct = (props) => {
  const editProduct = (item) => {
    props.showEditModal(item);
  };
  return (
    <Table striped bordered={false} hover>
      <thead>
        <tr>
          <th scope="col">Nama Product</th>
          <th scope="col">Merek</th>
          <th scope="col">Type</th>
          <th scope="col">Stock</th>
          <th scope="col">Harga</th>
          <th scope="col">Aksi</th>
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
              <td>
                <div className="btn btn-primary" onClick={() => editProduct(item)}>
                  Edit
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

TableProduct.propTypes = {
  products: PropTypes.array,
  showEditModal: PropTypes.func,
};

export default TableProduct;
