const Block = require('./blockchain.js');
const express = require("express");
const app = express();
const pool = require("./db");
// const SHA256 = require('crypto-js/sha256');
// const Block = require("./blockchain");
const { ClientBase } = require("pg");
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
    const { previous_hash } = req.body;

    let Voter = new Block(index,name,email,polling_booth,admin_name,previous_hash);
  
    

    // get prev hash

    // create new hash
    console.log("pasti jalan");
      const newVoter = await pool.query(
      "INSERT INTO blockvoter (index,name,email,admin_name,polling_booth,previous_hash) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      // [index, name, email, admin_name, polling_booth,previous_hash]
      [Voter.calculateProperty(Voter.index),Voter.calculateProperty(Voter.name), Voter.calculateProperty(Voter.email),Voter.calculateProperty(Voter.polling_booth),
        Voter.calculateProperty(Voter.admin_name),Voter.calculateProperty(Voter.previous_hash)]
      
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
