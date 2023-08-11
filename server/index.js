const express = require("express");
const apiRoute = require("./routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.APPLICATION_PORT || 3000;

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("Hello");
  res.sendFile(__dirname + "index.html");
});

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
