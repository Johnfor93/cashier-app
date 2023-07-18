const express = require("express");
const apiRoute = require("./../routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
