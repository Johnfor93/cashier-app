const Pool = require("pg").Pool;

const pool = new Pool({
  user: "johnforjc",
  host: "localhost",
  database: "cashier-app",
  password: "password",
  port: 5432,
});

module.exports = pool;
