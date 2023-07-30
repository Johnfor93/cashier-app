const transaction = require("./../models/transaction");
const HTTPSTATUS = require("./../config/httpstatus");

const getTransaction = async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;

  console.log(start);
  try {
    const result = await transaction.getTransaction(start, end);
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

const createTransaction = async (req, res) => {
  data = req.body;
  try {
    const result = await transaction.createTransaction(data.tanggal, data.total);
    console.log(result);
    res.status(HTTPSTATUS.Created).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

module.exports = {
  getTransaction,
  createTransaction,
};
