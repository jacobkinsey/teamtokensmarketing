"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./profile.module.css";
import { useSession } from "next-auth/react";
import StartCompanyModal from "../components/modals/startCompany";
import Image from "next/image";

interface Company {
  name: string;
  logo: string;
  companyuid: string;
}

interface CompanyListProps {
  companies: Company[];
}

export default function Profile() {
  const { data: session } = useSession();
  console.log("data: ", session);
  const [showStartCompany, setShowStartCompany] = useState(false);
  const [showJoinCompany, setShowJoinCompany] = useState(false);
  const [isShowingPhotoPicker, setIsShowingPhotoPicker] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    const id = "0b8167c0-9277-4f51-b913-eb810aaa7ffc";
    const url = `https://teamtokens.dev/api/v1/companies/byuser/${id}`;

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
        console.log("Companies: ", responseBody);
        setCompanies(responseBody);
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

  const openStartCompanyModal = () => {
    setShowStartCompany(true);
  };

  const closeStartCompanyModal = () => {
    setShowStartCompany(false);
  };

  const profileDetails = (
    <>
      <Image src="/avatar.png" alt="" className={styles.avatar} />
      <div className={styles.username}>{session?.user?.name ?? ""}</div>
      <div className={styles.email}>{session?.user?.email ?? ""}</div>
    </>
  );

  const actionButtons = (
    <button className={styles.button} onClick={() => openStartCompanyModal()}>
      Start Company
    </button>
  );

  const profileHeader = (
    <div className={styles.profileHeader}>
      <div className={styles.profileColumn}>{profileDetails}</div>
      <div className={styles.profileColumn}>{actionButtons}</div>
    </div>
  );

  const companyListTitle = (
    <div className={styles.companyListTitle}>Company List</div>
  );

  const companyList = (
    <div className="company-list">
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {companies.map((company) => (
        <Link
          href={{
            pathname: "/dashboard",
            query: { id: company.companyuid, name: company.name },
          }}
          key={company.name}
          className={styles.companyItem}
        >
          {company.logo ? (
            <Image
              src={company.logo}
              alt={`Logo for ${company.name}`}
              className={styles.companyLogo}
            />
          ) : (
            <div className={styles.circle} />
          )}

          <h3>{company.name}</h3>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      {profileHeader}
      <div className="content">
        {companyListTitle}
        {companyList}
        {showStartCompany && (
          <StartCompanyModal onClose={closeStartCompanyModal} />
        )}
      </div>
    </div>
  );
}
