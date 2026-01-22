import React, { useState } from "react";

const AddJournalForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    Title: "",
    Volume_Identifier: "",
    Format: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="Title" placeholder="Journal Title" onChange={handleChange} />
      <input name="Volume_Identifier" placeholder="Volume" onChange={handleChange} />
      <input name="Format" placeholder="Format" onChange={handleChange} />
      <button type="submit">Add Journal</button>
    </form>
  );
};

export default AddJournalForm;
