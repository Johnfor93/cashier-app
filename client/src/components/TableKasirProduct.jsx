import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const TableProduct = (props) => {
  const handlerClick = async (item, setShow) => {
    let items = await JSON.parse(localStorage.getItem("items"));
    if (items == null) items = [];
    items.push({
      kodebarang: item.kodebarang,
      nama_barang: item.nama_barang,
      jumlah_barang: 1,
      harga: item.harga,
      subtotal: item.harga,
    });
    localStorage.setItem("items", JSON.stringify(items));
    setShow(false);
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
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((item, index) => {
          return (
            <tr key={index}>
              <td scope="row">{item.nama_barang}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.jumlah}</td>
              <td>{item.harga}</td>
              <td>
                <Button variant="primary" onClick={() => handlerClick(item, props.setShow)}>
                  Tambah
                </Button>
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
  setShow: PropTypes.func,
};

export default TableProduct;
