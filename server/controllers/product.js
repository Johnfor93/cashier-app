const product = require("./../models/product");
const HTTPSTATUS = require("./../config/httpstatus");

const getItem = async (req, res) => {
  try {
    result = await product.getProduct();
    res.json({ result });
  } catch (error) {
    res.status(HTTPSTATUS.InternalServerError).json({ error });
  }
};

module.exports = {
  getItem,
};
