import { useEffect, useState } from "react";
import { Link } from "react-router-dom";   // ✅ ADDED
import Layout from "../components/Dashboard/Layout";
import Modal from "../components/common/Modal";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Researchers() {
  const { role } = useAuth();
  const [researchers, setResearchers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    Employee_ID: "",
    Name: "",
    Is_Editor_Chief: false,
    Office_Number: ""
  });

  useEffect(() => {
    fetchResearchers();
  }, []);

  const fetchResearchers = () => {
    API.get("/api/researchers")
      .then(res => setResearchers(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = () => {
    API.post("/api/researchers", form)
      .then(() => {
        alert("Researcher added successfully");
        setShowModal(false);
        fetchResearchers();
      })
      .catch(err => {
        alert(err.response?.data?.message || "Error adding researcher");
      });
  };

  return (
    <Layout>
      <h1>Researchers</h1>

      {role === "admin" && (
        <button onClick={() => setShowModal(true)}>
          + Add Researcher
        </button>
      )}

      {showModal && (
        <Modal title="Add Researcher" onClose={() => setShowModal(false)}>
          <input
            placeholder="Employee ID"
            onChange={e => setForm({ ...form, Employee_ID: e.target.value })}
          />
          <input
            placeholder="Name"
            onChange={e => setForm({ ...form, Name: e.target.value })}
          />
          <input
            placeholder="Office Number"
            onChange={e => setForm({ ...form, Office_Number: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              onChange={e =>
                setForm({ ...form, Is_Editor_Chief: e.target.checked })
              }
            />
            Editor-in-Chief
          </label>
          <button onClick={handleSubmit}>Add</button>
        </Modal>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Editor-in-Chief</th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          {researchers.map(r => (
            <tr key={r.Employee_ID}>
              <td>{r.Employee_ID}</td>

              {/* ✅ CLICKABLE NAME */}
              <td>
                <Link
                  to={`/researchers/${r.Employee_ID}`}
                  style={{
                    color: "#2e5fc9",
                    fontWeight: "500",
                    textDecoration: "none"
                  }}
                >
                  {r.Name}
                </Link>
              </td>

              <td>{r.Is_Editor_Chief ? "Yes" : "No"}</td>
              <td>{r.Office_Number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
