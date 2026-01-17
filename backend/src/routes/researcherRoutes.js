const express = require("express");
const router = express.Router();
const db = require("../config/db");

// TEST ROUTE (IMPORTANT)
router.get("/test", (req, res) => {
  res.send("Researcher route works");
});

// GET all researchers
router.get("/", (req, res) => {
  db.query("SELECT * FROM Researcher", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET researcher by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM Researcher WHERE Employee_ID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Researcher not found" });
      }

      res.json(result[0]);
    }
  );
});

// GET equipment skills for a researcher
router.get("/:id/skills", (req, res) => {
  const researcherId = req.params.id;

  const sql = `
    SELECT 
      e.Equipment_ID,
      e.Equipment_Name
    FROM skilled_in s
    JOIN lab_equipment e ON s.Equipment_ID = e.Equipment_ID
    WHERE s.Employee_ID = ?
  `;

  db.query(sql, [researcherId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(results);
  });
});


module.exports = router;
