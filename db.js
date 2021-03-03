const Pool = require("pg").Pool;

const pool = new Pool({
  user: "",
  password: "",
  database: "",
  host: "",
  port: "",
});

module.exports = pool;
