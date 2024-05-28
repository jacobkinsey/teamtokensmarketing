"use client";
import React, { useState, useEffect } from "react";
import styles from "./equityCalculator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ClassicTable from "./equityTables/classicTable";
import DynamicTable from "./equityTables/dynamicTable";

const EquityCalculator = () => {
  // State for the equity calculator
  const [founderCount, setFounderCount] = useState(1);
  const [founders, setFounders] = useState([
    {
      name: "Founder 1",
      rate: 0,
      hours: 0,
      tokens: 0,
      ownership: 100,
    },
  ]);
  const [isSimple, setIsSimple] = useState(false);
  const [isDynamic, setIsDynamic] = useState(true);
  const [totalOwnership, setTotalOwnership] = useState(100);
  const [totalTokens, setTotalTokens] = useState(0);
  const [shouldCalculate, setShouldCalculate] = useState(false);

  // Changes to the form
  const handleNameChange = (index, value) => {
    const newFounders = [...founders];
    newFounders[index].name = value;
    setFounders(newFounders);
  };

  const handleOwnershipChange = (index, value) => {
    const newFounders = [...founders];
    newFounders[index].ownership = parseFloat(value);
    setFounders(newFounders);
    setShouldCalculate(true);
  };

  const handleRateChange = (index, value) => {
    const newRate = [...founders];
    newRate[index].rate = parseFloat(value);

    const newTokenAmount = parseFloat(value) * newRate[index].hours * 2;
    newRate[index].tokens = newTokenAmount;

    setFounders(newRate);
    calculateDynamicEquity();
  };

  const handleHoursChange = (index, value) => {
    const newHours = [...founders];
    newHours[index].hours = parseFloat(value);

    const newTokenAmount = parseFloat(value) * newHours[index].rate * 2;
    newHours[index].tokens = newTokenAmount;

    setFounders(newHours);
    calculateDynamicEquity();
  };

  const handleSimpleModelChange = (event) => {
    setIsSimple(event.target.checked);
  };

  const handleDynamicEquityChange = (event) => {
    setIsDynamic(event.target.checked);
  };

  // add and remove founder
  const addFounder = async () => {
    const newFounderCount = founderCount + 1;
    setFounderCount(newFounderCount);

    if (isSimple) {
      console.log("simple");
      setFounders([
        ...founders,
        {
          name: `Founder ${newFounderCount}`,
          rate: 0,
          hours: 0,
          tokens: 0,
          ownership: 0,
        },
      ]);
      setShouldCalculate(true);
    } else if (isDynamic) {
      console.log("dynamic");
      setFounders([
        ...founders,
        {
          name: `Founder ${newFounderCount}`,
          rate: 0,
          hours: 0,
          tokens: 0,
          ownership: 0,
        },
      ]);
      setShouldCalculate(true);
    } else {
      console.log("other");
      setFounders([
        ...founders,
        {
          name: `Founder ${newFounderCount}`,
          rate: 0,
          hours: 0,
          tokens: 0,
          ownership: 0,
        },
      ]);
      setShouldCalculate(true);
    }
  };

  const removeFounder = (index) => {
    const newFounderCount = founderCount - 1;
    setFounderCount(newFounderCount);
    const newFounders = [...founders];
    newFounders.splice(index, 1);
    setFounders(newFounders);
    setShouldCalculate(true);
  };

  // calculate equity
  useEffect(() => {
    if (shouldCalculate) {
      calculateStandardEquity();
      setShouldCalculate(false);
    }
  }, [founders, shouldCalculate]);

  useEffect(() => {
    if (shouldCalculate) {
      calculateDynamicEquity();
      setShouldCalculate(false);
    }
  }, [founders, shouldCalculate]);

  const calculateStandardEquity = () => {
    let equity = (100 / founderCount).toFixed(2);
    const newFounders = [...founders];
    newFounders.forEach((founder) => {
      founder.ownership = equity;
    });
    setFounders(newFounders);

    let total = 0;
    founders.forEach((founder) => {
      total += parseFloat(founder.ownership);
    });
    setTotalOwnership(total);
  };

  const calculateDynamicEquity = () => {
    let tokens = 0;
    founders.forEach((founder) => {
      tokens += founder.tokens;
    });
    setTotalTokens(tokens);
  };

  //tool-tip
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>Founders Equity Calculator</div>
        <div className={styles.dynamicSwitch}>
          <div className={styles.row}>
            <h1>Fixed Equity</h1>
            <div
              className={styles["tooltip-container"]}
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className={styles["tooltip-icon"]}
              />
              {visible && (
                <div className={styles["tooltip-box"]}>
                  <p>
                    Fixed equity is a traditional method of allocating ownership
                    shares in a company. In this model, equity distribution is
                    determined and fixed at the company&apos;s formation or when
                    new shareholders join. Each founder or investor is assigned
                    a specific percentage of the company&apos;s equity, which
                    typically remains unchanged unless further negotiations
                    occur.
                  </p>
                </div>
              )}
            </div>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isDynamic}
              onChange={handleDynamicEquityChange}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <div className={styles.row}>
            <h1>Dynamic Equity</h1>
            <div
              className={styles["tooltip-container"]}
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className={styles["tooltip-icon"]}
              />
              {visible && (
                <div className={styles["tooltip-box"]}>
                  <p>
                    Dynamic equity is an adaptive method of distributing
                    ownership shares based on ongoing contributions. This model
                    reflects the actual value each team member brings over time.
                    Equity shares are not fixed and can change based on
                    contributions like time, resources, intellectual property,
                    or other inputs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className={styles["add-founder-btn"]} onClick={addFounder}>
          Add Founder
        </button>
        {isDynamic ? (
          <div>
            <div className={styles.tableHeader}>Dynamic Equity Table</div>
            <DynamicTable
              founders={founders}
              totalOwnership={totalOwnership}
              totalTokens={totalTokens}
              handleNameChange={handleNameChange}
              removeFounder={removeFounder}
              handleRateChange={handleRateChange}
              handleHoursChange={handleHoursChange}
            />
          </div>
        ) : (
          <div>
            <div className={styles.tableHeader}>Fixed Equity Table</div>
            <ClassicTable
              founders={founders}
              totalOwnership={totalOwnership}
              handleNameChange={handleNameChange}
              handleOwnershipChange={handleOwnershipChange}
              removeFounder={removeFounder}
            />
          </div>
        )}
        {isDynamic ? (
          <p className={styles["total-ownership"]}>
            Total Tokens: {totalTokens} TKNs
          </p>
        ) : (
          <p className={styles["total-ownership"]}>
            Total Ownership: {totalOwnership}%
          </p>
        )}
      </div>
    </div>
  );
};

export default EquityCalculator;
