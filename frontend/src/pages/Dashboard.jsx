import { useEffect, useState } from "react";
import Layout from "../components/Dashboard/Layout";
import API from "../services/api";
import "./Dashboard.css";


export default function Dashboard() {
  const [stats, setStats] = useState({
    researchers: 0,
    journals: 0,
    papers: 0,
    equipment: 0
  });

  useEffect(() => {
    API.get("/api/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h3>Researchers</h3>
          <p>{stats.researchers}</p>
        </div>

        <div className="card">
          <h3>Journals</h3>
          <p>{stats.journals}</p>
        </div>

        <div className="card">
          <h3>Papers</h3>
          <p>{stats.papers}</p>
        </div>

        <div className="card">
          <h3>Equipment</h3>
          <p>{stats.equipment}</p>
        </div>

        <div className="card">
          <h3>Office</h3>
          <p>{stats.offices}</p>
        </div>

      </div>
    </Layout>
  );
}
