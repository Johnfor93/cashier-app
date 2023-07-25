const product = require("./../models/product");
const HTTPSTATUS = require("./../config/httpstatus");

const getItem = async (req, res) => {
  try {
    const result = await product.getProduct();
    res.status(HTTPSTATUS.OK).json({ result });
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json({ error });
  }
};

const getItemByName = async (req, res) => {
  const nameToFind = req.params.name;
  try {
    const result = await product.getProductByName(nameToFind);
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json({ error });
  }
};

const createProduct = async (req, res) => {
  data = req.body;
  let errorInput = [];

  if (data.nama === undefined || data.nama == null) {
    errorInput.push("Field nama must not be null");
  }
  if (data.brand === undefined || data.brand == null) {
    errorInput.push("Field brand must not be null");
  }
  if (data.model === undefined || data.model == null) {
    errorInput.push("Field model must not be null");
  }
  if (data.jumlah === undefined || data.jumlah == null) {
    errorInput.push("Field stock must not be null");
  }
  if (data.harga === undefined || data.jumlah == null) {
    errorInput.push("Field price must not be null");
  }

  if (typeof data.jumlah === typeof String) {
    data.jumlah = parseInt(data.jumlah);
  }
  if (typeof data.harga === typeof String) {
    data.harga = parseInt(data.harga);
  }

  if (data.harga === 0) {
    errorInput.push("Field price value must not be 0");
  }

  data.id = data.nama + data.brand + data.model;

  if (errorInput.length > 0) {
    return res.status(HTTPSTATUS.BadRequest).json({
      error: errorInput,
    });
  }

  try {
    const result = await product.createProduct(data);
    res.status(HTTPSTATUS.OK).json({
      message: "Data telah dimasukkan",
      result,
    });
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json({ error });
  }
};

const updateProduct = async (req, res) => {
  data = req.body;
  let errorInput = [];

  if (data.nama === undefined || data.nama == null) {
    errorInput.push("Field nama must not be null");
  }
  if (data.brand === undefined || data.brand == null) {
    errorInput.push("Field brand must not be null");
  }
  if (data.model === undefined || data.model == null) {
    errorInput.push("Field model must not be null");
  }
  if (data.jumlah === undefined || data.jumlah == null) {
    errorInput.push("Field stock must not be null");
  }
  if (data.harga === undefined || data.jumlah == null) {
    errorInput.push("Field price must not be null");
  }

  if (typeof data.jumlah === typeof String) {
    data.jumlah = parseInt(data.jumlah);
  }
  if (typeof data.harga === typeof String) {
    data.harga = parseInt(data.harga);
  }

  if (data.harga === 0) {
    errorInput.push("Field price value must not be 0");
  }

  data.id = data.nama + data.brand + data.model;

  if (errorInput.length > 0) {
    return res.status(HTTPSTATUS.BadRequest).json({
      error: errorInput,
    });
  }

  try {
    const result = await product.createProduct(data);
    res.status(HTTPSTATUS.OK).json({
      message: "Data telah dimasukkan",
      result,
    });
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json({ error });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const result = product.deleteProduct(id);
    if (result == 0) {
      res.status(HTTPSTATUS.BadRequest).json({ message: "Data tidak ditemukan" });
    }
    res.status(HTTPSTATUS.NoContent).json({ message: `Data id ${id} has been deleted` });
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

module.exports = {
  getItem,
  getItemByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
