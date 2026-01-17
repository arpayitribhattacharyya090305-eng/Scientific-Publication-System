import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Dashboard/Layout";
import API from "../services/api";

export default function ResearcherProfile() {
  const { id } = useParams();

  const [researcher, setResearcher] = useState(null);
  const [papers, setPapers] = useState([]);

  // ✅ ADDED: Skills state
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // fetch researcher details
    API.get(`/api/researchers/${id}`)
      .then(res => setResearcher(res.data))
      .catch(() => setResearcher(null));

    // fetch papers by researcher
    API.get(`/api/papers/by-researcher/${id}`)
      .then(res => setPapers(res.data))
      .catch(() => setPapers([]));

    // ✅ ADDED: fetch equipment skills
    API.get(`/api/researchers/${id}/skills`)
      .then(res => setSkills(res.data))
      .catch(() => setSkills([]));

  }, [id]);

  if (!researcher) {
    return (
      <Layout>
        <h2>Researcher not found.</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Researcher Profile</h1>

      {/* 🔹 PROFILE CARD */}
      <div style={cardStyle}>
        <h2>{researcher.Name}</h2>
        <p><b>Employee ID:</b> {researcher.Employee_ID}</p>
        <p><b>Office:</b> {researcher.Office_Number}</p>
        <p>
          <b>Editor-in-Chief:</b>{" "}
          {researcher.Is_Editor_Chief ? "Yes" : "No"}
        </p>
      </div>

      <p>          </p>

      {/* 🔹 ADDED: SKILLS SECTION */}
      <div style={cardStyle}>
      <h2 style={{ marginTop: "30px" }}>Skills & Equipment</h2>

      {skills.length === 0 ? (
        <p>No equipment skills listed.</p>
      ) : (
        <ul style={{ marginLeft: "20px" }}>
          {skills.map(s => (
            <li key={s.Equipment_ID}>{s.Equipment_Name}</li>
          ))}
        </ul>
      )}
      </div>

      {/* 🔹 PAPERS SECTION */}
      <h2 style={{ marginTop: "30px" }}>Research Papers</h2>

      {papers.length === 0 ? (
        <p>No papers published yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Journal</th>
            </tr>
          </thead>
          <tbody>
            {papers.map(p => (
              <tr key={p.Paper_ID}>
                <td>{p.Paper_ID}</td>
                <td>{p.Title}</td>
                <td>{p.Journal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  width: "350px",
  borderRadius: "10px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
};
