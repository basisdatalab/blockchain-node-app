const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.error("connection error", err.message));

module.exports = pool;
