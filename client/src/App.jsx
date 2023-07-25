import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Transaksi from "./pages/Transaksi.jsx";
import Kasir from "./pages/Kasir.jsx";
import Product from "./pages/Product.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="transaksi" element={<Transaksi />} />
            <Route path="kasir" element={<Kasir />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
