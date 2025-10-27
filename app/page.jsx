"use client";
import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          <span>Welcome</span> to all...
        </h1>
        <p className={styles.subtitle}>
          Modern and secure authentication system
        </p>

        <div className={styles.buttonGroup}>
          <Link href="/login" className={styles.primaryButton}>
            Login
          </Link>
          <Link href="/register" className={styles.secondaryButton}>
            Create New Account
          </Link>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div
              className={styles.cardIcon}
              style={{ backgroundColor: "#e0f2fe" }}
            >
              {" "}
              {/* Custom inline style */}
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Secure</h3>
            <p className={styles.cardDescription}>
              Maximum data security with top-notch protection
            </p>
          </div>

          <div className={styles.card}>
            <div
              className={styles.cardIcon}
              style={{ backgroundColor: "#e0f2fe" }}
            >
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Fast</h3>
            <p className={styles.cardDescription}>
              Instant login and registration
            </p>
          </div>

          <div className={styles.card}>
            <div
              className={styles.cardIcon}
              style={{ backgroundColor: "#e0f2fe" }}
            >
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Responsive</h3>
            <p className={styles.cardDescription}>
              Beautiful display on all devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
