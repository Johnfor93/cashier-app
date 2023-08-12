const database = require("./../config/postgres");

const getProduct = async (limit, offset) => {
  try {
    const result = await database.query("SELECT * FROM Product LIMIT $1 OFFSET $2", [limit, offset]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getProductByName = async (name, limit, offset) => {
  name = name.replace(/\s/g, "%");
  name = "%" + name + "%";
  try {
    const result = await database.query("SELECT * FROM Product WHERE nama_barang LIKE $1 OR kodebarang LIKE $1 LIMIT $2 OFFSET $3", [name, limit, offset]);
    return {
      count: result.rowCount,
      result: result.rows,
    };
  } catch (error) {
    throw error;
  }
};

const createProduct = async (data) => {
  try {
    const result = await database.query("INSERT INTO Product VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [data.kodeBarang, data.nama, data.brand, data.model, data.jumlah, data.harga, data.kategoriBarang]);
    if (result.rowCount == 0) {
      return {
        error: "Data tidak dapat dimasukkan",
      };
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProduct = async (data, kodebarang) => {
  try {
    const result = await database.query("UPDATE Product SET nama_barang = $2, brand=$3, model=$4, jumlah=$5, harga=$6, kategori_barang=$7 WHERE kodebarang = $1", [
      kodebarang,
      data.nama,
      data.brand,
      data.model,
      data.jumlah,
      data.jumlah,
      data.kategoriBarang,
    ]);
    if (result.rowCount == 0) {
      console.log("data tidak ditemukan");
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await database.query("DELETE FROM product WHERE kodebarang = $1", [id]);
    if (result.rowCount == 0) {
      throw new Error("Data tidak dapat ditemukan");
    }
    return result.rowCount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProduct,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
