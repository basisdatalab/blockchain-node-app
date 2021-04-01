const { Blockvoter, BlockDatavoter } = require("./blockchain");
const express = require("express");
const app = express();
const pool = require("./db");
// const SHA256 = require('crypto-js/sha256');
// const Block = require("./blockchain");
// var router = require("./app/route/route");
const port = 3000;

// app.use("/api/v1/node", router);

app.use(express.json()); // REQ.BODY

// GET ALL VOTER
app.get("/voter", async (req, res) => {
  try {
    const allVoter = await pool.query("SELECT * FROM blockvoter;");

    res.json(allVoter.rows);
  } catch (err) {
    console.log(err.message);
  }
});
// GET ALL VOTER

// CREATE A VOTER
app.post("/voter", async (req, res) => {
  try {
    // INSERT GENESIS BLOCK
    const genesisblockvoter = await pool.query("SELECT * FROM blockvoter;");
    const genesisDatavoter = await pool.query("SELECT * FROM datavoter");

    if (genesisblockvoter.rows == 0) {
      let genesisBlockvoter = new Blockvoter(
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block"
      );

      console.log(genesisBlockvoter);

      const genesisInsertBlockvoter = await pool.query(
        "INSERT INTO blockvoter (index,name,email,polling_booth,admin_name,timestamp,hash,previous_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;",
        // [genesisBlock.calculateProperty(genesisBlock.index),genesisBlock.calculateProperty(genesisBlock.name), genesisBlock.calculateProperty(genesisBlock.email),genesisBlock.calculateProperty(genesisBlock.polling_booth),
        //   genesisBlock.calculateProperty(genesisBlock.admin_name),genesisBlock.calculateProperty(genesisBlock.previous_hash)]
        [
          genesisBlockvoter.index,
          genesisBlockvoter.name,
          genesisBlockvoter.email,
          genesisBlockvoter.polling_booth,
          genesisBlockvoter.admin_name,
          genesisBlockvoter.timestamp,
          genesisBlockvoter.hash,
          genesisBlockvoter.previous_hash,
        ]
      );
    }

    if (genesisDatavoter.rows == 0) {
      let genesisBlockDatavoter = new BlockDatavoter(
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block",
        "Genesis Block"
      );
      const genesisInsertBlockDatavoter = await pool.query(
        "INSERT INTO datavoter (nim,index_detail,chosen_candidate,timestamp,hash,previous_hash) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;",
        // [genesisBlock.calculateProperty(genesisBlock.index),genesisBlock.calculateProperty(genesisBlock.name), genesisBlock.calculateProperty(genesisBlock.email),genesisBlock.calculateProperty(genesisBlock.polling_booth),
        //   genesisBlock.calculateProperty(genesisBlock.admin_name),genesisBlock.calculateProperty(genesisBlock.previous_hash)]
        [
          genesisBlockDatavoter.nim,
          genesisBlockDatavoter.index_detail,
          genesisBlockDatavoter.chosen_candidate,
          genesisBlockDatavoter.timestamp,
          genesisBlockDatavoter.hash,
          genesisBlockDatavoter.previous_hash,
        ]
      );
    }
    // END INSERT GENESIS BLOCK

    // GET PREVIOUS HASH
    const previousHash = await pool.query("SELECT hash FROM blockvoter;");
    // END GET PREVIOUS HASH

    // CREATE NEW HASH
    const { index } = req.body;
    const { name } = req.body;
    const { email } = req.body;
    const { polling_booth } = req.body;
    const { admin_name } = req.body;
    const { timestamp } = req.body;
    const { hash } = req.body;
    const previous_hash = previousHash.rows[previousHash.rows.length - 1].hash;

    let Voter = new Blockvoter(
      index,
      name,
      email,
      polling_booth,
      admin_name,
      timestamp,
      hash,
      previous_hash
    );

    const newVoter = await pool.query(
      "INSERT INTO blockvoter (index,name,email,polling_booth,admin_name,timestamp,hash,previous_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;",
      // [Voter.calculateProperty(Voter.index),Voter.calculateProperty(Voter.name), Voter.calculateProperty(Voter.email),Voter.calculateProperty(Voter.polling_booth),
      //   Voter.calculateProperty(Voter.admin_name),Voter.calculateProperty(Voter.previous_hash)]
      [
        Voter.index,
        Voter.name,
        Voter.email,
        Voter.polling_booth,
        Voter.admin_name,
        Voter.timestamp,
        Voter.hash,
        Voter.previous_hash,
      ]
    );

    res.json(newVoter.rows[0]);
    console.log("Data Berhasil di input ke database");
  } catch (err) {
    console.error(err.message);
  }
});
// END CREATE A VOTER

app.listen(port, () => {
  console.log(`Node app is live at port ${port}`);
});
