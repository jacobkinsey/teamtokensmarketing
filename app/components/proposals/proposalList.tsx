import React from "react";
import styles from "./proposals.module.css";

const ProposalList: React.FC = () => {
  return (
    <div className={styles.proposals}>
      <button className={styles.button} onClick={() => console.log("clicked")}>
        Add Collaborator
      </button>
      <button className={styles.button} onClick={() => console.log("clicked")}>
        Remove Collaborator
      </button>
      <button className={styles.button} onClick={() => console.log("clicked")}>
        Dispute Entry
      </button>
    </div>
  );
};

export default ProposalList;
