import React, { useState } from "react";

const AddResearcherForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    Employee_ID: "",
    Name: "",
    Is_Editor_Chief: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="Employee_ID" placeholder="Employee ID" onChange={handleChange} />
      <input name="Name" placeholder="Name" onChange={handleChange} />
      <label>
        Editor-in-Chief
        <input type="checkbox" name="Is_Editor_Chief" onChange={handleChange} />
      </label>
      <button type="submit">Add Researcher</button>
    </form>
  );
};

export default AddResearcherForm;
