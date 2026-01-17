const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* GET all journals */
router.get("/", (req, res) => {
  const sql = `
    SELECT J.*, R.Name AS Editor_Name
    FROM Journal J
    JOIN Researcher R ON J.Editor_Chief_ID = R.Employee_ID
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* ADD Journal */
router.post("/", (req, res) => {
  const { Journal_ID, Title, Volume_Identifier, Format, Publication_Date, Editor_Chief_ID } = req.body;

  // 🔒 Constraint: Editor must exist
  const checkEditor = "SELECT * FROM Researcher WHERE Employee_ID = ?";
  db.query(checkEditor, [Editor_Chief_ID], (err, rows) => {
    if (rows.length === 0) {
      return res.status(400).json({ message: "Editor-in-Chief must be a valid researcher" });
    }

    const sql = `
      INSERT INTO Journal
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [Journal_ID, Title, Volume_Identifier, Format, Publication_Date, Editor_Chief_ID],
      err => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Journal created successfully" });
      }
    );
  });
});

module.exports = router;
