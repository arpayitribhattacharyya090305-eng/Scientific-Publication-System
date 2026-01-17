import { useEffect, useState } from "react";
import Layout from "../components/Dashboard/Layout";
import Modal from "../components/common/Modal";
import API from "../services/api";

export default function Office() {
  const [offices, setOffices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    Office_Number: "",
    Phone_Extension: "",
    Address: ""
  });

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = () => {
    API.get("/api/offices")
      .then((res) => setOffices(res.data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = () => {
    API.post("/api/offices", form)
      .then(() => {
        alert("Office added successfully!");
        setShowModal(false);
        fetchOffices();
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Error adding office")
      );
  };

  return (
    <Layout>
      <h1>Office Directory</h1>

      <button onClick={() => setShowModal(true)}>+ Add Office</button>

      {showModal && (
        <Modal title="Add Office" onClose={() => setShowModal(false)}>
          <input
            placeholder="Office Number"
            onChange={(e) =>
              setForm({ ...form, Office_Number: e.target.value })
            }
          />
          <input
            placeholder="Phone Extension"
            onChange={(e) =>
              setForm({ ...form, Phone_Extension: e.target.value })
            }
          />
          <input
            placeholder="Address"
            onChange={(e) => setForm({ ...form, Address: e.target.value })}
          />

          <button onClick={handleSubmit}>Add</button>
        </Modal>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Office No.</th>
            <th>Phone Extension</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {offices.map((o) => (
            <tr key={o.Office_Number}>
              <td>{o.Office_Number}</td>
              <td>{o.Phone_Extension}</td>
              <td>{o.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

