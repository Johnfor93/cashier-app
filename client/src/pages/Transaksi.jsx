import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import TableTransaction from "../components/TableTransaction";
import Dropdown from "react-bootstrap/Dropdown";

const Transaksi = () => {
  const [show, setShow] = useState(true);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    let url = "http://localhost:3000/api/getTransaction";

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
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" eventKey={"action"}>
              Action
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" eventKey={"action2"}>
              Another action
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" eventKey={"action3"}>
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
