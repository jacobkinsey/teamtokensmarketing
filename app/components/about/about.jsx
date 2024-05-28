import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <h1>About</h1>
      <div className={styles.aboutContainer}>
        <Image
          src="/startup-about.jpg"
          alt="For Startups"
          width="200"
          height="200"
          className={styles.aboutImage}
        />
        <p>
          Many start-ups falter due to equity disputes. Splitting a company
          equally between co-founders can lead to issues when not all
          co-founders contribute equally. As teammembers come and go on a
          project, cap tables can become bloated by teammembers who are no
          longer contributing. Dynamic equity splits are a great way to fairly
          track everyone&apos;s contributions once equity divisions are assigned
          at a later date. However, the process of recording everyone&apos;s
          contributions can be challenging. TeamTokens provides a simple, easy
          to use mobile application that allows for teammembers to quickly add
          and view equity distributions.
        </p>
      </div>
    </section>
  );
};

export default About;
