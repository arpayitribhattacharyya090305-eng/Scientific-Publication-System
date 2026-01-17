import { useEffect, useState } from "react";
import Layout from "../components/Dashboard/Layout";
import Modal from "../components/common/Modal";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Journals() {
  const { role } = useAuth();

  const [journals, setJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    Journal_ID: "",
    Title: "",
    Volume_Identifier: "",
    Format: "",
    Publication_Date: "",
    Editor_Chief_ID: ""
  });

  // 🔹 FETCH JOURNALS
  const fetchJournals = () => {
    API.get("/api/journals")
      .then(res => setJournals(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // 🔹 ADD JOURNAL
  const handleSubmit = () => {
    API.post("/api/journals", form)
      .then(() => {
        alert("Journal added successfully");
        setShowModal(false);
        fetchJournals();
      })
      .catch(err => {
        alert(err.response?.data?.message || "Error adding journal");
      });
  };

  return (
    <Layout>
      <h1>Journals</h1>

      {role === "researcher" && (
        <button onClick={() => setShowModal(true)}>
          + Add Journal
        </button>
      )}

      {showModal && (
        <Modal title="Add Journal" onClose={() => setShowModal(false)}>
          <input placeholder="Journal ID"
            onChange={e => setForm({ ...form, Journal_ID: e.target.value })} />

          <input placeholder="Title"
            onChange={e => setForm({ ...form, Title: e.target.value })} />

          <input placeholder="Volume Identifier"
            onChange={e => setForm({ ...form, Volume_Identifier: e.target.value })} />

          <input placeholder="Format (Print / Online)"
            onChange={e => setForm({ ...form, Format: e.target.value })} />

          <input type="date"
            onChange={e => setForm({ ...form, Publication_Date: e.target.value })} />

          <input placeholder="Editor-in-Chief ID"
            onChange={e => setForm({ ...form, Editor_Chief_ID: e.target.value })} />

          <button onClick={handleSubmit}>Add</button>
        </Modal>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Volume</th>
            <th>Format</th>
            <th>Editor</th>
          </tr>
        </thead>
        <tbody>
          {journals.map(j => (
            <tr key={j.Journal_ID}>
              <td>{j.Journal_ID}</td>
              <td>{j.Title}</td>
              <td>{j.Volume_Identifier}</td>
              <td>{j.Format}</td>
              <td>{j.Editor_Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
