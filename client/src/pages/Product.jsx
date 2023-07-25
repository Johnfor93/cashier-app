import { useState, useEffect } from "react";
import TableProduct from "../components/TableProduct";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  useEffect(() => {
    getProduct();
  }, [searchProduct]);

  const searchItems = (event) => {
    setSearchProduct(event.target.value);
  };

  const getProduct = async () => {
    const response = await fetch("http://localhost:3000/api/getItem");
    const data = await response.json();
    setProducts(data.result);
  };

  console.log(products);

  return (
    <div className="px-4 w-100">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <span className="fs-4">Product</span>
      </div>
      <div className="d-flex align-items-center mb-3 p-3">
        <input type="text" name="searchProduct" onChange={searchItems} />
      </div>
      <div className="d-flex align-items-center mb-3 px-3">
        <TableProduct products={products} />
      </div>
    </div>
  );
};

export default Product;
