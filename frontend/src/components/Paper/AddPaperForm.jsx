import React, { useState } from "react";

const AddPaperForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    Title: "",
    Research_Area: "",
    Lead_Author_ID: ""
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
      <input name="Title" placeholder="Paper Title" onChange={handleChange} />
      <input name="Research_Area" placeholder="Research Area" onChange={handleChange} />
      <input name="Lead_Author_ID" placeholder="Lead Author ID" onChange={handleChange} />
      <button type="submit">Add Paper</button>
    </form>
  );
};

export default AddPaperForm;
