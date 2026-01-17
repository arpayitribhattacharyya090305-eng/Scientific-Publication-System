const express = require("express");
const router = express.Router();
const db = require("../config/db");


   //GET ALL PAPERS (Send LeadAuthor & Journal EXACT names)

router.get("/", (req, res) => {
  const sql = `
    SELECT 
      rp.Paper_ID,
      rp.Title,
      rp.Research_Area,
      r.Name AS LeadAuthor,
      j.Title AS Journal
    FROM Research_Paper rp
    LEFT JOIN Researcher r ON rp.Lead_Author_ID = r.Employee_ID
    LEFT JOIN Journal j ON rp.Journal_ID = j.Journal_ID
    ORDER BY rp.Paper_ID;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching papers:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});


  // GET PAPERS BY RESEARCHER (Profile Page)

router.get("/by-researcher/:id", (req, res) => {
  const researcherId = req.params.id;

  const sql = `
    SELECT 
      rp.Paper_ID,
      rp.Title,
      rp.Research_Area,
      j.Title AS Journal
    FROM Research_Paper rp
    LEFT JOIN Journal j ON rp.Journal_ID = j.Journal_ID
    WHERE rp.Lead_Author_ID = ?;
  `;

  db.query(sql, [researcherId], (err, results) => {
    if (err) {
      console.error("Error fetching papers for researcher:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});


 //  ADD NEW PAPER

router.post("/", (req, res) => {
  const { Paper_ID, Title, Research_Area, Lead_Author_ID, Journal_ID } = req.body;

  const sql = `
    INSERT INTO Research_Paper 
      (Paper_ID, Title, Research_Area, Lead_Author_ID, Journal_ID)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [Paper_ID, Title, Research_Area, Lead_Author_ID, Journal_ID],
    (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ message: "Insert failed" });
      }
      res.json({ message: "Research paper added successfully" });
    }
  );
});

module.exports = router;
