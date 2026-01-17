const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL OFFICES
router.get("/", (req, res) => {
  const sql = "SELECT * FROM office ORDER BY Office_Number ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json(err);
    }

    console.log("OFFICE DATA SENT:", results);  // debug log
    res.json(results);
  });
});


// ADD Office
router.post("/", (req, res) => {
  const { Office_Number, Phone_Extension, Address } = req.body;

  const sql = `
    INSERT INTO office (Office_Number, Phone_Extension, Address)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [Office_Number, Phone_Extension, Address], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Office added successfully" });
  });
});

module.exports = router;
