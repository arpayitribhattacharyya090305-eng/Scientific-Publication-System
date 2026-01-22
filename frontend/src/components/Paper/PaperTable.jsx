import React from "react";

const PaperTable = ({ papers }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Research Area</th>
          <th>Lead Author</th>
        </tr>
      </thead>
      <tbody>
        {papers.map(p => (
          <tr key={p.Paper_ID}>
            <td>{p.Title}</td>
            <td>{p.Research_Area}</td>
            <td>{p.Lead_Author_ID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaperTable;
