import React from "react";
import "./DataTable.scss";

const DataTable = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, i) => {
              const value = col.accessor?.includes(".")
                ? col.accessor.split(".").reduce((obj, key) => obj?.[key], row)
                : row[col.accessor];

              return <td key={i}>{col.render ? col.render(row) : value}</td>;
            })}
            <td className="actions">
              <button className="edit-btn" onClick={() => onEdit(row)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(row._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
