const detailTransaction = require("./../models/detailtransaction");
const HTTPSTATUS = require("./../config/httpstatus");

const getDetailTransaction = async (req, res) => {
  const id = req.params.id;
  if (id === undefined || id == null) {
    return res.status(HTTPSTATUS.BadRequest).json({
      error: "Id must be passed",
    });
  }
  if (typeof id === typeof String) {
    id = parseInt(id);
    if (id === 0) {
      return res.status(HTTPSTATUS.BadRequest).json({
        error: "Id must be valid integer value",
      });
    }
  }

  try {
    const result = await detailTransaction.getDtlTransactionbyId(id);
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

const createDetailTransaction = async (req, res) => {
  data = req.body;
  let errorInput = [];

  if (data.id === undefined || data.id == null) {
    errorInput.push("Field id must not be null");
  }
  if (data.kode_barang === undefined || data.kode_barang == null) {
    errorInput.push("Field product code must not be null");
  }
  if (data.jumlah_barang === undefined || data.jumlah_barang == null) {
    errorInput.push("Field product count must not be null");
  }
  if (data.subtotal === undefined || data.subtotal == null) {
    errorInput.push("Field subtotal must not be null");
  }

  if (errorInput.length() > 0) {
    return res.status(HTTPSTATUS.BadRequest).json({
      error: errorInput,
    });
  }

  try {
    const result = detailTransaction.createDtlTransaction(data);
    res.status(HTTPSTATUS.Created).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

module.exports = {
  getDetailTransaction,
  createDetailTransaction,
};
