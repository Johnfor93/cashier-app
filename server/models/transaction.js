const database = require("./../config/postgres");

const createTransaction = ({ id, tanggal, total }) => {
  database.query("INSERT INTO transaksi VALUES ($1, $2, $3)", [id, tanggal, total], (error, result) => {
    if (error) throw error;
    if (result.rowCount == 0) {
      error = "Data tidak berhasil dimasukkan";
      throw error;
    }
    return result.rows[0];
  });
};

const getTransaction = () => {
  database.query("SELECT * FROM transaksi", (error, result) => {
    if (error) throw error;
    return result.rows;
  });
};

const getTransactionbyId = (id) => {
  database.query("SELECT * FROM transaksi WHERE id_transaksi $1", [id], (error, result) => {
    if (error) throw error;
    return result.rows;
  });
};

module.exports = {
  createTransaction,
  getTransaction,
  getTransactionbyId,
};
