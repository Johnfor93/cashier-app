import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import TableTransaction from "../components/TableTransaction";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

import "react-datepicker/dist/react-datepicker.css";

const Transaksi = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [show, setShow] = useState(true);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const handlerClick = () => {
    getTransaction();
  };

  const formatDate = (date) => {
    let getMonth = date.toLocaleString("default", { month: "2-digit" });
    let getDay = date.toLocaleString("default", { day: "2-digit" });
    let getYear = date.toLocaleString("default", { year: "numeric" });

    return `${getYear}-${getMonth}-${getDay}`;
  };

  const getTransaction = async () => {
    const formatedStartDate = formatDate(startDate);
    const formatedEndDate = formatDate(endDate);
    let url = `http://localhost:3000/api/getTransaction/${formatedStartDate}/${formatedEndDate}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.count === 0) {
      setShow(true);
      setTransaction([]);
      return;
    }
    setShow(false);
    setTransaction(data.result);
  };
  return (
    <div className="px-4">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <span className="fs-4">Transaksi</span>
      </div>
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <div className="row pe-3">
          <div className="col">
            <span className="fs-4">Mulai:</span>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} maxDate={new Date()} />
          </div>
        </div>
        <div className="row pe-3">
          <div className="col">
            <span className="fs-4">Akhir:</span>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} maxDate={new Date()} minDate={startDate} />
          </div>
        </div>
        <div className="row p-3">
          <Button variant="primary" onClick={handlerClick}>
            Cari Transaksi
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
          <TableTransaction transaction={transaction} />
        </div>
      )}
    </div>
  );
};

export default Transaksi;
