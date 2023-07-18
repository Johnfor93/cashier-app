const database = require("./../config/postgres");

const createDtlTransaction = ({ id, kode_barang, jumlah_barang, subtotal }) => {
  database.query("INSERT INTO dtl_transaksi VALUES ($1, $2, $3)", [id, kode_barang, jumlah_barang, subtotal], (error, result) => {
    if (error) throw error;
    if (result.rowCount == 0) {
      error = "Data tidak berhasil dimasukkan";
      throw error;
    }
    return result.rows[0];
  });
};

const getDtlTransaction = () => {
  database.query("SELECT * FROM dtl_transaksi", (error, result) => {
    if (error) throw error;
    return result.rows;
  });
};

const getDtlTransactionbyId = (id) => {
  database.query("SELECT * FROM dtl_transaksi WHERE id_transaksi = $1", [id], (error, result) => {
    if (error) throw error;
    return result.rows;
  });
};

module.exports = {
  createDtlTransaction,
  getDtlTransaction,
  getDtlTransactionbyId,
};
