const apiRoute = require("express").Router();
const product = require("./../controllers/product");
const transaction = require("./../controllers/transaction");
const dtlTransaction = require("./../controllers/detailtransaction");

apiRoute.get("/", (req, res) => res.json("Hello"));

// Product api
apiRoute.get("/getItem/:page", (req, res) => product.getItem(req, res));
apiRoute.get("/getItemByName/:name/:page", (req, res) => product.getItemByName(req, res));
apiRoute.get("/getItemByName/:name", (req, res) => product.getItemByName(req, res));
apiRoute.put("/updateItem/:kodebarang", (req, res) => product.updateProduct(req, res));
apiRoute.post("/addItem", (req, res) => product.createProduct(req, res));

apiRoute.get("/getItembyId/:id", (req, res) => {
  res.json({ data: `Ini get Item by Id api dengan id: ${req.params.id}` });
});

// Transaction api
apiRoute.get("/getTransaction/:start/:end", (req, res) => transaction.getTransaction(req, res));
apiRoute.post("/addTransaction", (req, res) => transaction.createTransaction(req, res));

// Detail Transaction
apiRoute.get("/getDetailTransaction", (req, res) => dtlTransaction.getDetailTransaction(req, res));
apiRoute.post("/addDetailTransaction", (req, res) => dtlTransaction.createDetailTransaction(req, res));

module.exports = apiRoute;
