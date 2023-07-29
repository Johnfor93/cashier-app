import { useState, useEffect } from "react";
import TableProduct from "../components/TableProduct";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    getProduct();
  }, []);

  const handlerClick = () => {
    getProduct(searchProduct);
  };

  const searchItems = (event) => {
    setSearchProduct(event.target.value);
  };

  const getProduct = async (searchName = "") => {
    let url = "http://localhost:3000/api/getItem";
    if (searchName !== "") {
      url += `byName/${searchName}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (data.count === 0) {
      setShow(true);
      setProducts([]);
      return;
    }
    setShow(false);
    setProducts(data.result);
  };

  return (
    <div className="px-4 w-100">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <span className="fs-4">Product</span>
      </div>
      <div className="d-flex mb-3 p-3 align-content-end w-100">
        <div className="col-5">
          <Form.Control type="text" placeholder="Cari Produk" onChange={searchItems} />
        </div>
        <div className="col">
          <Button variant="primary" onClick={handlerClick}>
            Cari Product
          </Button>
        </div>
      </div>
      {show ? (
        <div className="d-flex align-items-center mb-3 p-3">
          <Alert className="col" variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Data tidak ditemukan</Alert.Heading>
          </Alert>
        </div>
      ) : (
        <div className="d-flex align-items-center mb-3 p-3">
          <TableProduct products={products} />
        </div>
      )}
    </div>
  );
};

export default Product;
