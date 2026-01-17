const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./src/config/db");

// ROUTES
const researcherRoutes = require("./src/routes/researcherRoutes");
const journalRoutes = require("./src/routes/journalRoutes");
const paperRoutes = require("./src/routes/paperRoutes");
const equipmentRoutes = require("./src/routes/equipmentRoutes");
const officeRoutes = require("./src/routes/officeRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/researchers", researcherRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/offices", officeRoutes);

// TEST ROUTES
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend successfully connected to backend 🎉" });
});

/* =========================
      DASHBOARD COUNTS
========================= */
app.get("/api/dashboard", (req, res) => {
  const queries = {
    researchers: "SELECT COUNT(*) AS count FROM Researcher",
    journals: "SELECT COUNT(*) AS count FROM Journal",
    papers: "SELECT COUNT(*) AS count FROM Research_Paper",
    equipment: "SELECT COUNT(*) AS count FROM Lab_Equipment",
    offices: "SELECT COUNT(*) AS count FROM office"
  };

  const result = {};

  db.query(queries.researchers, (err, r1) => {
    if (err) return res.status(500).json(err);
    result.researchers = r1[0].count;

    db.query(queries.journals, (err, r2) => {
      if (err) return res.status(500).json(err);
      result.journals = r2[0].count;

      db.query(queries.papers, (err, r3) => {
        if (err) return res.status(500).json(err);
        result.papers = r3[0].count;

        db.query(queries.equipment, (err, r4) => {
          if (err) return res.status(500).json(err);
          result.equipment = r4[0].count;

          // ⭐ FIXED: final nested query + missing braces added
          db.query(queries.offices, (err, r5) => {
            if (err) return res.status(500).json(err);
            result.offices = r5[0].count;

            res.json(result);
          });
        });
      });
    });
  });
});


      //START SERVER

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
