import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Dashboard/Layout";
import Modal from "../components/common/Modal";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Researchers() {
  const { role } = useAuth();

  const [researchers, setResearchers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔥 FIXED FORM STATE (matches backend)
  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    officeNumber: "",
    isEditorChief: false
  });

  useEffect(() => {
    fetchResearchers();
  }, []);

  const fetchResearchers = () => {
    API.get("/api/researchers")
      .then(res => setResearchers(res.data))
      .catch(err => console.error(err));
  };

  // 🔥 FIXED SUBMIT HANDLER
  const handleSubmit = () => {
    // Basic validation
    if (!form.employeeId || !form.name || !form.officeNumber) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      employeeId: Number(form.employeeId),
      name: form.name,
      officeNumber: Number(form.officeNumber),
      isEditorChief: form.isEditorChief
    };

    console.log("SENDING:", payload); // ✅ debug

    API.post("/api/researchers", payload)
      .then(() => {
        alert("Researcher added successfully");
        setShowModal(false);
        setForm({
          employeeId: "",
          name: "",
          officeNumber: "",
          isEditorChief: false
        });
        fetchResearchers();
      })
      .catch(err => {
        console.error("ADD ERROR:", err.response?.data);
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
            type="number"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={e =>
              setForm({ ...form, employeeId: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Office Number"
            value={form.officeNumber}
            onChange={e =>
              setForm({ ...form, officeNumber: e.target.value })
            }
          />

          <label>
            <input
              type="checkbox"
              checked={form.isEditorChief}
              onChange={e =>
                setForm({ ...form, isEditorChief: e.target.checked })
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

              {/* ✅ CLICKABLE NAME (UNCHANGED) */}
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
