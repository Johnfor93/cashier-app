const database = require("./../config/postgres");

const createDtlTransaction = async ({ id, kode_barang, jumlah_barang, subtotal }) => {
  try {
    const result = await database.query("INSERT INTO dtl_transaksi VALUES ($1, $2, $3, %4)", [id, kode_barang, jumlah_barang, subtotal]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat dimasukkan");
    }
    return result.rows[0];
  } catch (error) {
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

module.exports = {
  createDtlTransaction,
  getDtlTransaction,
  getDtlTransactionbyId,
};
