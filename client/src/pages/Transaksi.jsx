const Transaksi = () => {
  const result = async () => {
    const response = await fetch("http://localhost:3000/api/");
    const data = await response.json();
    console.log(data);
  };
  result();
  return (
    <div className="px-4">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none">
        <span className="fs-4">Transaksi</span>
      </div>
    </div>
  );
};

export default Transaksi;
