"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import styles from "./signup.module.css";
import { error } from "console";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
    const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const url = 'https://teamtokens.dev/api/v1/auth/register';
    const payload = {
        username: formData?.username,
        email: formData?.email,
        password: formData?.password,
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
            console.log("Register: ",responseBody);
            router.push(`/confirmation?username=${formData.username}`);
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
          <div>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
              Retype Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
