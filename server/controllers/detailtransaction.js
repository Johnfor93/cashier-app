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
  datas = req.body;
  let errorInput = [];

  if (datas.id === undefined || datas.id == null) {
    errorInput.push("Field id must not be null");
  }

  for (let i = 0; i < datas.product.length; i++) {
    data = datas.product[i];
    if (data.kode_barang === undefined || data.kode_barang == null) {
      errorInput.push("Field product code must not be null");
    }
    if (data.jumlah_barang === undefined || data.jumlah_barang == null) {
      errorInput.push("Field product count must not be null");
    }
    if (data.subtotal === undefined || data.subtotal == null) {
      errorInput.push("Field subtotal must not be null");
    }
  }

  if (errorInput.length > 0) {
    return res.status(HTTPSTATUS.BadRequest).json({
      error: errorInput,
    });
  }
  let result = [];

  for (let i = 0; i < datas.product.length; i++) {
    data = datas.product[i];
    console.log(data.jumlah_barang);

    try {
      result.push(await detailTransaction.createDtlTransaction(datas.id, data.kode_barang, data.jumlah_barang, data.subtotal));
      // res.status(HTTPSTATUS.Created).json(result);
    } catch (error) {
      for (let idx = 0; idx < result.length; idx++) {
        detailTransaction.deleteDtlTransaction(result[idx]);
      }
      return res.status(HTTPSTATUS.InternalServerError).json(error);
    }
  }
  console.log(result);
  res.status(HTTPSTATUS.Created).json({
    success: true,
    countRow: result.length,
  });
};

module.exports = {
  getDetailTransaction,
  createDetailTransaction,
};
