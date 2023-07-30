const database = require("./../config/postgres");

const createDtlTransaction = async (id, kode_barang, jumlah_barang, subtotal) => {
  try {
    const result = await database.query("INSERT INTO dtl_transaksi(id_transaksi, kodebarang, jumlah_barang, subtotal) VALUES ($1, $2, $3, $4) RETURNING id", [id, kode_barang, jumlah_barang, subtotal]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat dimasukkan");
    }
    return result.rows[0].id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDtlTransaction = async () => {
  try {
    const result = await database.query("SELECT * FROM dtl_transaksi");
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getDtlTransactionbyId = async (id) => {
  try {
    const result = await database.query("SELECT * FROM dtl_transaksi WHERE id_transaksi = $1", [id]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const deleteDtlTransaction = async (id) => {
  try {
    const result = await database.query("DELETE FROM dtl_transaksi WHERE id = $1", [id]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDtlTransaction,
  getDtlTransaction,
  getDtlTransactionbyId,
  deleteDtlTransaction,
};
