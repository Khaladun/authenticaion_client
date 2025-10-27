"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
    redirect("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logo}>
            <Link href="/dashboard" className={styles.logoLink}>
              AuthApp
            </Link>
          </div>

          <div className={styles.desktopMenu}>
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            <Link href="/profile" className={styles.navLink}>
              Profile
            </Link>
            <div className={styles.userSection}>
              <span className={styles.userName}>{user?.name}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          </div>

          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.menuToggle}
            >
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <Link
              href="/dashboard"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <div className={styles.mobileUserSection}>
              <p className={styles.mobileUserName}>{user?.name}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className={styles.mobileLogoutButton}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
