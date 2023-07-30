import { useState, useEffect } from "react";
import TableKasir from "./../components/TableKasir.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalKasir from "../components/ModalKasir.jsx";

const Kasir = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const modalClose = (close) => {
    setShow(close);
    getProductFromLocalstorage();
  };

  const handlerClick = () => {
    getProduct(searchProduct);
    console.log(products);
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
      await setProducts([]);
      await setShow(true);
      return;
    }
    await setProducts(data.result);
    await setShow(true);
  };

  const getProductFromLocalstorage = () => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  };

  const handleSave = async () => {
    console.log(items);
  };

  useEffect(() => {
    getProductFromLocalstorage();
  }, []);

  return (
    <div className="px-4 w-100">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <span className="fs-4">Kasir</span>
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
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <TableKasir items={items} />
      </div>
      <Button variant="primary" onClick={handleSave}>
        Simpan
      </Button>
      <ModalKasir show={show} setShow={modalClose} products={products} />
    </div>
  );
};

export default Kasir;
