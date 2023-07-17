const apiRoute = require("express").Router();

apiRoute.get("/getItem", (req, res) => {
  res.json({ data: "Ini get Item api" });
});

apiRoute.get("/getItembyId/:id", (req, res) => {
  res.json({ data: `Ini get Item by Id api dengan id: ${req.params.id}` });
});

apiRoute.post("/addItem", (req, res) => {
  res.json({ data: "Item telah dimasukkan" });
});

apiRoute.get("/getTransaction", (req, res) => {
  res.json({ data: "Transaksi yang didapat" });
});

apiRoute.post("/addTransaction", (req, res) => {
  res.json({ data: "Data telah dimasukkan ke add Transaction" });
});

module.exports = apiRoute;
