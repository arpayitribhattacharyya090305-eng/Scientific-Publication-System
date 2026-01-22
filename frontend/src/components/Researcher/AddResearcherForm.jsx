import React, { useState } from "react";

const AddResearcherForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    officeNumber: "",
    isEditorChief: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 basic validation
    if (!form.employeeId || !form.name || !form.officeNumber) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ Send EXACT keys backend expects
    onSubmit({
      employeeId: Number(form.employeeId),
      name: form.name,
      officeNumber: Number(form.officeNumber),
      isEditorChief: form.isEditorChief
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="employeeId"
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="officeNumber"
        placeholder="Office Number"
        value={form.officeNumber}
        onChange={handleChange}
        required
      />

      <label>
        Editor-in-Chief
        <input
          type="checkbox"
          name="isEditorChief"
          checked={form.isEditorChief}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Researcher</button>
    </form>
  );
};

export default AddResearcherForm;
