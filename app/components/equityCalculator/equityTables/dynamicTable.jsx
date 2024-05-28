import React from "react";
import styles from "../equityCalculator.module.css";

const DynamicTable = ({
  founders,
  totalOwnership,
  totalTokens,
  handleNameChange,
  removeFounder,
  handleRateChange,
  handleHoursChange,
}) => {
  return (
    <table className={styles["founders-table"]}>
      <thead>
        <tr>
          <th className={styles["table-header"]}>Name</th>
          <th className={styles["table-header"]}>Rate</th>
          <th className={styles["table-header"]}>Hours</th>
          <th className={styles["table-header"]}>Multiplier</th>
          <th className={styles["table-header"]}>Tokens</th>
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
                value={founder.rate}
                onChange={(e) => handleRateChange(index, e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className={styles["input-field"]}
                value={founder.hours}
                onChange={(e) => handleHoursChange(index, e.target.value)}
              />
            </td>
            <td className={styles.equity}>2</td>
            <td className={styles.equity}>{founder.tokens}</td>
            <td className={styles.equity}>
              {totalTokens == 0
                ? "0"
                : ((founder.tokens / totalTokens) * 100).toFixed(2)}
              %
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

export default DynamicTable;
