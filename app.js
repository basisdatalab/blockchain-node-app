const express = require("express");
const app = express();
const pool = require("./db");
// var router = require("./app/route/route");
const port = 3000;

// app.use("/api/v1/node", router);

app.use(express.json()); // req.body

// get all voter
app.get("/voter", async (req, res) => {
  try {
    const allVoter = await pool.query("SELECT * FROM blockvoter");

    res.json(allVoter.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//create a voter
app.post("/voter", async (req, res) => {
  try {
    const { index } = req.body;
    const { name } = req.body;
    const { email } = req.body;
    const { polling_booth } = req.body;
    const { admin_name } = req.body;

    // get prev hash

    // create new hash

    const newVoter = await pool.query(
      "INSERT INTO blockvoter (index,name,email,polling_booth,admin_name) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [index, name, email, polling_booth, admin_name]
    );

    res.json(newVoter.rows[0]);
    console.log("Data Berhasil di input ke database");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Node app is live at port ${port}`);
});
