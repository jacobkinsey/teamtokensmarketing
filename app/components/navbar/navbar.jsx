"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  console.log("active?: ", menuActive);

  return (
    <header>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoImage}>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
          <div className={styles.logoText}>TeamTokens</div>
        </Link>
        <div className={`${styles.menu} ${menuActive ? styles.active : ""}`}>
          <ul>
            {session ? (
              <>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={() => signOut({ redirect: false })}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/#features">Features</Link>
                </li>
                <li>
                  <Link href="/#about">About Us</Link>
                </li>
                <li>
                  <Link href="/#support">Support</Link>
                </li>
                {/* <li>
                  <Link href="/signup">Sign up</Link>
                </li>
                <li>
                  <button onClick={() => signIn()}>Sign in</button>
                </li> */}
              </>
            )}
          </ul>
        </div>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <div
            className={`${styles.bar} ${menuActive ? styles.active : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${menuActive ? styles.active : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${menuActive ? styles.active : ""}`}
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
