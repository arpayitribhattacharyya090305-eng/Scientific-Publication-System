import React, { useState } from "react";

const AssignAuthorForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    Employee_ID: "",
    Paper_ID: "",
    Author_Role: ""
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
      <input name="Employee_ID" placeholder="Researcher ID" onChange={handleChange} />
      <input name="Paper_ID" placeholder="Paper ID" onChange={handleChange} />
      <input name="Author_Role" placeholder="Role" onChange={handleChange} />
      <button type="submit">Assign Author</button>
    </form>
  );
};

export default AssignAuthorForm;


