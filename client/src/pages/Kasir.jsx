import { useState, useEffect } from "react";
import TableKasir from "./../components/TableKasir.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalKasir from "../components/ModalKasir.jsx";
import ModalPrint from "../components/ModalPrint.jsx";

const Kasir = () => {
  const [show, setShow] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [totalBayar, setTotalBayar] = useState(0);
  const [searchProduct, setSearchProduct] = useState("");

  const handlePrintClose = () => {
    setShowPrint(false);
  };

  const modalClose = (close) => {
    setShow(close);
    getProductFromLocalstorage();
  };

  const handlerClick = () => {
    getProduct(searchProduct);
  };

  const searchItems = (event) => {
    setSearchProduct(event.target.value);
  };

  const getProduct = async (searchName = "") => {
    let url = "http://localhost:3000/api/getItem";
    if (searchName !== "") {
      url += `byName/${searchName.toUpperCase()}`;
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

  const getProductFromLocalstorage = async () => {
    const items = await JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }

    let total = 0;
    for (let idx in items) {
      total += parseInt(items[idx].subtotal);
    }
    setTotalBayar(total);
  };

  const handleSave = async () => {
    setShowPrint(false);
    if (items.length === 0) return;
    // dapetin tanggal lalu create transaksi dulu returnnya id
    const date = new Date();
    const getMonth = date.toLocaleString("default", { month: "2-digit" });
    const getDay = date.toLocaleString("default", { day: "2-digit" });
    const getYear = date.toLocaleString("default", { year: "numeric" });

    const dateFormat = `${getYear}-${getMonth}-${getDay}`;
    const dataTransaksi = {
      tanggal: dateFormat,
      total: totalBayar,
    };
    console.log(dataTransaksi);

    const result = await fetch("http://localhost:3000/api/addTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTransaksi),
    });
    const data = await result.json();
    if (data.name) {
      return;
    }

    // dengan id yang sama, create detail transaksinya
    let itemsDetail = [];
    for (let idx in items) {
      itemsDetail.push({
        kode_barang: items[idx].kodebarang,
        jumlah_barang: items[idx].jumlah_barang,
        subtotal: items[idx].subtotal,
      });
    }

    const dataDetail = {
      id: data.id_transaksi,
      product: itemsDetail,
    };
    console.log(dataDetail);

    const responseDetail = await fetch("http://localhost:3000/api/addDetailTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataDetail),
    });

    const responseDetailJson = await responseDetail.json();
    console.log(responseDetailJson);

    if (responseDetailJson.success) {
      setItems([]);
      setTotalBayar(0);
      localStorage.removeItem("items");
    }
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
      <Button variant="primary" onClick={() => setShowPrint(true)}>
        Simpan
      </Button>
      <ModalKasir show={show} setShow={modalClose} products={products} />
      <ModalPrint show={showPrint} handleClose={handlePrintClose} handleSave={handleSave} products={items}></ModalPrint>
    </div>
  );
};

export default Kasir;
