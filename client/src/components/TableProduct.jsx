import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import Barcode from "react-barcode";

const TableProduct = (props) => {
  const editProduct = (item) => {
    props.showEditModal(item);
  };
  return (
    <Table striped bordered={false} hover>
      <thead>
        <tr>
          <th scope="col">Barcode</th>
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
              <td scope="row">
                <div className="barcode-box">
                  <Barcode value={item.kodebarang} width={1} height={40} />
                </div>
                <div className="barcode-download">
                  <a target="blank" download>
                    Download
                  </a>
                </div>
              </td>
              <td>{item.nama_barang}</td>
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
