const database = require("./../config/postgres");

const getProduct = async () => {
  database.query("SELECT * FROM Product", (err, res) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(res.rows);
    return res.rows;
  });
};

const createProduct = (data) => {
  database.query("INSERT INTO Product VALUES ($1, $2, $3, $4, $5, $6)", [data.id, data.nama, data.brand, data.model, data.jumlah, data.jumlah], (error, result) => {
    if (error) {
      throw error;
    }
    console.log(res.rows[0]);
    return res.rows[0];
  });
};

const updateProduct = (data) => {
  database.query("UPDATE Product SET nama_barang = $2, brand=$3, model=$4, jumlah=$5, harga=$6 WHERE kodebarang = $1", [data.id, data.nama, data.brand, data.model, data.jumlah, data.jumlah], (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result.rows[0]);
    return result.rows[0];
  });
};

const deleteProduct = (id) => {
  database.query("DELETE FROM product WHERE kodebarang = $1", [id], (error, result) => {
    if (error) throw error;
    console.log(result.rows[0]);
    return result.rows[0];
  });
};

module.exports = {
  getProduct,
};
