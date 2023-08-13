import { useState, useEffect } from "react";
import TableProduct from "../components/TableProduct";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalAddProduct from "../components/ModalAddProduct";
import ModalEditProduct from "../components/ModalEditProduct";

const Product = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [show, setShow] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [pages, setPages] = useState(0);

  useEffect(() => {
    getProduct();
  }, [showForm, showFormEdit, pages]);

  const handlerClose = () => {
    setShowForm(false);
  };

  const handlerEditClose = () => {
    setShowFormEdit(false);
  };

  const showEditModal = (item) => {
    setShowFormEdit(true);
    getProduct();
    setProductToEdit(item);
  };

  const showFormFunction = () => {
    setShowForm(true);
    console.log(showForm);
  };

  const nextPage = async () => {
    setPages(pages + 1);
  };

  const backPage = async () => {
    if (pages != 0) {
      await setPages(pages - 1);
    }
  };
  const handlerClick = () => {
    setPages(0);
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
    url += `/${pages}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    if (data.count === 0 || data.error) {
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
      <div className="d-flex mb-3 p-3 align-content-end w-100 justify-content-between">
        <div className="d-flex col-8">
          <div className="col-8">
            <Form.Control type="text" placeholder="Cari Produk" onChange={searchItems} />
          </div>
          <div>
            <Button variant="primary" onClick={handlerClick}>
              Cari Product
            </Button>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <Button variant="primary" onClick={showFormFunction}>
            Add Product
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
        ""
      )}
      <div>
        <div className="d-flex align-items-center mb-3 p-3">
          <TableProduct products={products} showEditModal={showEditModal} />
        </div>
        <div>
          <button id="back-btn" className="btn btn-sm btn-rounded btn-outline-secondary .text-secondary" onClick={backPage}>
            &larr; Back
          </button>
          <button id="next-btn" className="btn btn-sm btn-rounded btn-outline-secondary .text-secondary" onClick={nextPage}>
            Next &rarr;
          </button>
        </div>
      </div>

      {showForm === true ? <ModalAddProduct show={showForm} handleClose={handlerClose} /> : ""}
      {showFormEdit === true ? <ModalEditProduct show={showFormEdit} handleClose={handlerEditClose} product={productToEdit} /> : ""}
    </div>
  );
};

export default Product;
