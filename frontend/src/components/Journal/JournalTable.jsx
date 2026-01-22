import React from "react";

const JournalTable = ({ journals }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Volume</th>
          <th>Editor-in-Chief</th>
        </tr>
      </thead>
      <tbody>
        {journals.map(j => (
          <tr key={j.Journal_ID}>
            <td>{j.Title}</td>
            <td>{j.Volume_Identifier}</td>
            <td>{j.Editor_Chief_ID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JournalTable;
