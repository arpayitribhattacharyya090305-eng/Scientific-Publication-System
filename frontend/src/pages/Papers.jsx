import { useEffect, useState } from "react";
import Layout from "../components/Dashboard/Layout";
import Modal from "../components/common/Modal";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Papers() {
  const { role } = useAuth();

  const [papers, setPapers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    Paper_ID: "",
    Title: "",
    Research_Area: "",
    Lead_Author_ID: "",
    Journal_ID: ""
  });

  // 🔹 FETCH PAPERS
  const fetchPapers = () => {
    API.get("/api/papers")
      .then(res => setPapers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // 🔹 ADD PAPER
  const handleSubmit = () => {
    API.post("/api/papers", form)
      .then(() => {
        alert("Paper added successfully");
        setShowModal(false);
        fetchPapers();
      })
      .catch(err => {
        alert(err.response?.data?.message || "Error adding paper");
      });
  };

  return (
    <Layout>
      <h1>Research Papers</h1>

      {role === "researcher" && (
        <button onClick={() => setShowModal(true)}>
          + Add Paper
        </button>
      )}

      {showModal && (
        <Modal title="Add Research Paper" onClose={() => setShowModal(false)}>
          <input placeholder="Paper ID"
            onChange={e => setForm({ ...form, Paper_ID: e.target.value })} />

          <input placeholder="Title"
            onChange={e => setForm({ ...form, Title: e.target.value })} />

          <input placeholder="Research Area"
            onChange={e => setForm({ ...form, Research_Area: e.target.value })} />

          <input placeholder="Lead Author ID"
            onChange={e => setForm({ ...form, Lead_Author_ID: e.target.value })} />

          <input placeholder="Journal ID"
            onChange={e => setForm({ ...form, Journal_ID: e.target.value })} />

          <button onClick={handleSubmit}>Add</button>
        </Modal>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Area</th>
            <th>Lead Author</th>
            <th>Journal</th>
          </tr>
        </thead>
        <tbody>
          {papers.map(p => (
            <tr key={p.Paper_ID}>
              <td>{p.Paper_ID}</td>
              <td>{p.Title}</td>
              <td>{p.Research_Area}</td>
              <td>{p.LeadAuthor}</td>
              <td>{p.Journal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
