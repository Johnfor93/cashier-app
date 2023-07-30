const database = require("./../config/postgres");

const createTransaction = async (tanggal, total) => {
  try {
    const result = await database.query("INSERT INTO transaksi(tanggal_transaksi, total_transaksi) VALUES ($1, $2) RETURNING id_transaksi", [tanggal, total]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat dimasukkan");
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getTransaction = async (start, end) => {
  try {
    const result = await database.query(
      "select nama_barang, jumlah_barang, harga, subtotal, tanggal_transaksi at time zone 'utc' at time zone 'Asia/Jakarta' as tanggal_transaksi from dtl_transaksi, product, transaksi where dtl_transaksi.kodebarang = product.kodebarang and dtl_transaksi.id_transaksi = transaksi.id_transaksi and transaksi.tanggal_transaksi between $1 and $2",
      [start, end]
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
