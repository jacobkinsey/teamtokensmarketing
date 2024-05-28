"use client";
import React, { useState } from "react";
import styles from "./confirmation.module.css";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormData {
  code: string;
}

const Confirmation: React.FC = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const username = searchParams.get("username");
    const url = 'https://teamtokens.dev/api/v1/auth/confirm';
    const payload = {
      code: formData?.code,
      username: username
    };

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }

    try {
        const response = await fetch(url, data)
        if (response.ok) {
            const responseBody = await response.json();
            console.log("Confirm: ",responseBody);
            signIn(undefined, { callbackUrl: '/profile' });
        } else {
            const errorResponse = await response.json();
            console.error("Error: ", errorResponse);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
    
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.formGroup}>
          <h3>{searchParams.get("username")}</h3>
          <div>
            <label htmlFor="code" className={styles.label}>
              Code:
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Confirmation;
