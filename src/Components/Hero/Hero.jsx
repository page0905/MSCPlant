import React from "react";
import styles from "../../pages/Home/Home.module.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>
          Welcome to <span className={styles.highlight}>MSC Plant</span>
        </h1>
        <h2>Bring the beauty of nature into your home.</h2>
        <Link to="/plants" className={styles.btn}>
          Take a Look
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
