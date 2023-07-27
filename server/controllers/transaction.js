const transaction = require("./../models/transaction");
const HTTPSTATUS = require("./../config/httpstatus");

const getTransaction = async (req, res) => {
  try {
    const result = await transaction.getTransaction();
    res.status(HTTPSTATUS.OK).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

const createTransaction = async (req, res) => {
  data = req.body;
  try {
    const result = await transaction.createTransaction(data);
    res.status(HTTPSTATUS.Created).json(result);
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json(error);
  }
};

module.exports = {
  getTransaction,
  createTransaction,
};
