import React from "react";
import { Link } from "react-router";
import styles from "./Home.module.css";

import BlueBanner from "../assets/blue-banner.png";
import PinkButton from "../assets/pink-button.png";
import GirlsArt from "../assets/girls.png";
import StarsArt from "../assets/stars.png";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeCard}>
        <div className={styles.homeMain}>
          {/* banner with overlay text */}
          <div className={styles.bannerWrapper}>
            <img
              src={BlueBanner}
              alt="Create a Story"
              className={styles.banner}
            />
            <h1 className={styles.bannerText}>ComicGen</h1>
          </div>

          {/* stars + girls */}
          <div className={styles.starsWrapper}>
            <img src={StarsArt} alt="Stars" className={styles.stars} />
            <img
              src={GirlsArt}
              alt="Characters"
              className={styles.characters}
            />
          </div>

          <div className={styles.homeText}>
            <h2 className={styles.share}>Share your style</h2>
            <p className={styles.homeDescription}>
              Meet ComicGen: paste your idea, hit “Generate,” and get a full
              four-panel comic no drawing required.
            </p>

            {/* pink button with overlay text */}
            <Link to="/chat" className={styles.pinkButtonWrapper}>
              <img
                src={PinkButton}
                alt="Create Here"
                className={styles.createBtn}
              />
              <span className={styles.pinkButtonText}>Let's Go!</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
