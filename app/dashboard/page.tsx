"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faTable,
  faFile,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { useSearchParams } from "next/navigation";
import DonutChart from "../components/donut/donut";
import CapTable from "../components/captable/captable";
import ProposalCard from "../components/proposals/proposalCard";
import ProposalList from "../components/proposals/proposalList";

interface VoteRecord {
  creatorname: string;
  datecreated: string;
  dateedited: string;
  deadline: string;
  description: string;
  disputereason: string | null;
  email: string;
  firstname: string;
  hasvoted: boolean;
  hoursadjustment: number | null;
  isclosed: boolean;
  lastname: string;
  maxhours: number;
  period: string | null;
  proposaluid: string;
  rate: number;
  rateadjustment: number | null;
  removalcollaboratorname: string | null;
  removalreason: string | null;
  type: string;
  votesagainst: number;
  votesfor: number;
  votesremaining: number;
  votesrequired: number;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [currentState, setCurrentState] = useState<string>("dashboard");
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [hoverColors, setHoverColors] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [proposals, setProposals] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // get token data
    getTokens();
    getTransactions();
    getProposals();
    // get list of proposals
  });

  // companies/tokens/:id
  const getTokens = async () => {
    const id = searchParams.get("id");
    console.log("id: ", id);
    const url = `https://teamtokens.dev/api/v1/companies/tokens/${id}`;

    const data = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, data);
      if (response.ok) {
        const responseBody = await response.json();
        console.log("Tokens: ", responseBody);

        const extractedLabels = responseBody.map((x: { slug: any }) => x.slug);
        setLabels(extractedLabels);

        const extractedData = responseBody.map(
          (x: { total_amount: any }) => x.total_amount
        );
        setData(extractedData);

        const extractedColors = responseBody.map(
          (x: { color: any }) => `#${x.color}`
        );
        setBackgroundColors(extractedColors);
        setHoverColors(extractedColors);
      } else {
        const errorResponse = await response.json();
        console.error("Error: ", errorResponse);
        setError("Failed to fetch companies");
      }
    } catch (error) {
      console.error("Error: ", error);
      setError("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async () => {
    const id = searchParams.get("id");
    console.log("id: ", id);
    const url = `https://teamtokens.dev/api/v1/transactions/bycompany/${id}`;

    const data = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, data);
      if (response.ok) {
        const responseBody = await response.json();
        console.log("transactions: ", responseBody);
        setTransactionData(responseBody);
      } else {
        const errorResponse = await response.json();
        console.error("Error: ", errorResponse);
        setError("Failed to fetch companies");
      }
    } catch (error) {
      console.error("Error: ", error);
      setError("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  // proposals/bycompanybyuser
  const getProposals = async () => {
    const companyUid = searchParams.get("id");
    const userUid = "0b8167c0-9277-4f51-b913-eb810aaa7ffc";
    const url = "https://teamtokens.dev/api/v1/proposals/bycompanybyuser";
    const payload = {
      companyUid: companyUid,
      userUid: userUid,
    };

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
        console.log("proposals: ", responseBody);
        setProposals(responseBody);
      } else {
        const errorResponse = await response.json();
        console.error("Error: ", errorResponse);
        setError("Failed to fetch proposals");
      }
    } catch (error) {
      console.error("Error: ", error);
      setError("Failed to fetch proposals");
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (newState: string) => {
    setCurrentState(newState);
  };

  const dashboard = (
    <>
      <div className={styles.subHeader}>Token Breakdown</div>
      <DonutChart
        labels={labels}
        data={data}
        backgroundColors={backgroundColors}
        hoverColors={hoverColors}
      />
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => console.log("clicked")}
        >
          Make Entry
        </button>
      </div>
    </>
  );

  const captable = (
    <>
      <div className={styles.subHeader}>Cap Table</div>
      {/* <div>revoke entries</div> */}
      <div className={styles.table}>
        <CapTable data={transactionData} />
      </div>
    </>
  );

  const tokenManagement = (
    <>
      <div className={styles.subHeader}>Proposals</div>
      <div className={styles.proposalBody}>
        <div className={styles.voteRecords}>
          {proposals.map((record, index) => (
            <ProposalCard key={index} proposal={record} />
          ))}
        </div>
        <div className={styles.proposalList}>
          <ProposalList />
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/profile">
          <FontAwesomeIcon icon={faArrowLeft} fontSize={25} color="#2c3d63" />
        </Link>
        <div className={styles.companyName}>{searchParams.get("name")}</div>
      </div>

      <nav>
        <ul className={styles.navList}>
          <li className={currentState === "dashboard" ? styles.active : ""}>
            <a onClick={() => handleStateChange("dashboard")}>
              <FontAwesomeIcon icon={faChartPie} />
              Dashboard
            </a>
          </li>
          <li className={currentState === "captable" ? styles.active : ""}>
            <a onClick={() => handleStateChange("captable")}>
              <FontAwesomeIcon icon={faTable} />
              Cap Table
            </a>
          </li>
          <li className={currentState === "proposals" ? styles.active : ""}>
            <a onClick={() => handleStateChange("proposals")}>
              <FontAwesomeIcon icon={faFile} />
              Proposals
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        {/* <div>{searchParams.get("data")}</div> */}
        {currentState === "dashboard" && dashboard}
        {currentState === "captable" && captable}
        {currentState === "proposals" && tokenManagement}
      </div>
    </div>
  );
}
