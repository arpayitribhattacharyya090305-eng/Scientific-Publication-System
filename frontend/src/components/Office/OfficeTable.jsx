import React from "react";

const OfficeTable = ({ offices }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Office No</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {offices.map(o => (
          <tr key={o.Office_Number}>
            <td>{o.Office_Number}</td>
            <td>{o.Phone_Extension}</td>
            <td>{o.Address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OfficeTable;
