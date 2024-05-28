import React from "react";
import styles from "../equityCalculator.module.css";

const ClassicTable = ({
  founders,
  totalOwnership,
  handleNameChange,
  handleOwnershipChange,
  removeFounder,
}) => {
  return (
    <table className={styles["founders-table"]}>
      <thead>
        <tr>
          <th className={styles["table-header"]}>Name</th>
          <th className={styles["table-header"]}>Ownership Percentage</th>
          <th className={styles["table-header"]}>Equity</th>
          <th className={styles["table-header"]}>Action</th>
        </tr>
      </thead>
      <tbody>
        {founders.map((founder, index) => (
          <tr key={index} className={styles["founder-row"]}>
            <td>
              <input
                type="text"
                className={styles["input-field"]}
                value={founder.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className={styles["input-field"]}
                value={founder.ownership}
                onChange={(e) => handleOwnershipChange(index, e.target.value)}
              />
            </td>
            <td className={styles.equity}>
              {((founder.ownership * 100) / totalOwnership).toFixed(2)}%
            </td>
            <td>
              <button
                className={styles["remove-btn"]}
                onClick={() => removeFounder(index)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClassicTable;
