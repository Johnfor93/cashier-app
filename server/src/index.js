const express = require("express");
const apiRoute = require("./../routes/api");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
