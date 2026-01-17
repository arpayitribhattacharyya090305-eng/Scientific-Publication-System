import { useEffect, useState } from "react";
import Layout from "../components/Dashboard/Layout";
import Modal from "../components/common/Modal";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Equipment() {
  const { role } = useAuth();

  const [equipment, setEquipment] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    Equipment_ID: "",
    Equipment_Name: "",
    Primary_Calibration: ""
  });

  // 🔹 FETCH EQUIPMENT
  const fetchEquipment = () => {
    API.get("/api/equipment")
      .then(res => setEquipment(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  // 🔹 ADD EQUIPMENT
  const handleSubmit = () => {
    API.post("/api/equipment", form)
      .then(() => {
        alert("Equipment added successfully");
        setShowModal(false);
        fetchEquipment();
      })
      .catch(err => {
        alert(err.response?.data?.message || "Error adding equipment");
      });
  };

  return (
    <Layout>
      <h1>Lab Equipment</h1>

      {role === "admin" && (
        <button onClick={() => setShowModal(true)}>
          + Add Equipment
        </button>
      )}

      {showModal && (
        <Modal title="Add Equipment" onClose={() => setShowModal(false)}>
          <input
            placeholder="Equipment ID"
            onChange={e =>
              setForm({ ...form, Equipment_ID: e.target.value })
            }
          />

          <input
            placeholder="Equipment Name"
            onChange={e =>
              setForm({ ...form, Equipment_Name: e.target.value })
            }
          />

          <input
            placeholder="Primary Calibration"
            onChange={e =>
              setForm({ ...form, Primary_Calibration: e.target.value })
            }
          />

          <button onClick={handleSubmit}>Add</button>
        </Modal>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Calibration</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(eq => (
            <tr key={eq.Equipment_ID}>
              <td>{eq.Equipment_ID}</td>
              <td>{eq.Equipment_Name}</td>
              <td>{eq.Primary_Calibration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
