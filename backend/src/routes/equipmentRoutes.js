const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* GET all equipment */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Lab_Equipment";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* ADD equipment */
router.post("/", (req, res) => {
  const { Equipment_ID, Equipment_Name, Primary_Calibration } = req.body;

  const sql = `
    INSERT INTO Lab_Equipment
    (Equipment_ID, Equipment_Name, Primary_Calibration)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [Equipment_ID, Equipment_Name, Primary_Calibration],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Equipment added successfully" });
    }
  );
});

module.exports = router;
