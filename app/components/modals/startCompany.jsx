import React, { useState } from "react";
import styles from "./startCompany.module.css";

const StartCompanyModal = ({ onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [consensusPercentage, setConsensusPercentage] = useState("");
  const [founderRate, setFounderRate] = useState("");
  const [color, setColor] = useState("#FF0000");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can perform additional checks for file type and size if needed
      setCompanyLogo(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Construct form data
    const userUid = "0b8167c0-9277-4f51-b913-eb810aaa7ffc";
    const payload = {
      name: companyName,
      logo: companyLogo,
      consensus: consensusPercentage,
      userUid: userUid,
      rate: founderRate,
      maxHours: 40,
      color: color,
    };

    await onSubmit(payload);
  };

  const onSubmit = async (payload) => {
    const url = `https://teamtokens.dev/api/v1/companies/`;

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, data);
      if (response.ok) {
        const responseBody = await response.json();
        console.log("Companies: ", responseBody);
        //setCompanies(responseBody);
      } else {
        const errorResponse = await response.json();
        console.error("Error: ", errorResponse);
        //setError("Failed to fetch companies");
      }
    } catch (error) {
      console.error("Error: ", error);
      //setError("Failed to fetch companies");
    } finally {
      //setLoading(false);
    }
  };

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains(styles.modalBackground)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackground} onClick={handleBackgroundClick}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          X
        </span>
        <h1 className={styles.header}>Create Company</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Company Name:
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </label>
          <label>
            Company Logo:
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleFileChange}
              required
            />
          </label>
          <label>
            Consensus Percentage:
            <input
              type="number"
              value={consensusPercentage}
              onChange={(e) => setConsensusPercentage(e.target.value)}
              required
            />
          </label>
          <label>
            Founder Rate:
            <input
              type="number"
              value={founderRate}
              onChange={(e) => setFounderRate(e.target.value)}
              required
            />
          </label>
          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </label>
          <div className={styles.buttonContainer}>
            <button
              className={styles.buttonWhite}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartCompanyModal;
