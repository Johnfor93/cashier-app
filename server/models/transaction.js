const database = require("./../config/postgres");

const createTransaction = async ({ id, tanggal, total }) => {
  try {
    const result = await database.query("INSERT INTO transaksi VALUES ($1, $2, $3)", [id, tanggal, total]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat dimasukkan");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getTransaction = async () => {
  try {
    const result = await database.query(
      "select nama_barang, jumlah_barang, harga, subtotal, tanggal_transaksi from dtl_transaksi, product, transaksi where dtl_transaksi.kodebarang = product.kodebarang and dtl_transaksi.id_transaksi = transaksi.id_transaksi"
    );
    // console.log(result);
    return {
      count: result.rowCount,
      result: result.rows,
    };
  } catch (error) {
    throw error;
  }
};

const getTransactionbyId = async (id) => {
  try {
    const result = await database.query("SELECT * FROM transaksi WHERE id_transaksi $1", [id]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  getTransactionbyId,
};
