import React from "react";

const EquipmentTable = ({ equipment }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Calibration</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map(e => (
          <tr key={e.Equipment_ID}>
            <td>{e.Equipment_Name}</td>
            <td>{e.Primary_Calibration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
