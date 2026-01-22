import React from "react";

const ResearcherTable = ({ researchers }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Editor-in-Chief</th>
        </tr>
      </thead>
      <tbody>
        {researchers.map(r => (
          <tr key={r.Employee_ID}>
            <td>{r.Employee_ID}</td>
            <td>{r.Name}</td>
            <td>{r.Is_Editor_Chief ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResearcherTable;
