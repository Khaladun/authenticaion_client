"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { authAPI } from "@/lib/api";
import Navbar from "../../components/Navbar";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, loading, router]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setProfileLoading(true);

    try {
      await authAPI.updateProfile(profileData);
      await refreshUser();
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setProfileLoading(true);

    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    } finally {
      setProfileLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Profile Settings</h1>
          <p className={styles.subtitle}>Manage your account information</p>
        </div>

        <div className={styles.tabContainer}>
          <div className={styles.tabHeader}>
            <button
              onClick={() => {
                setActiveTab("profile");
                setError("");
                setSuccess("");
              }}
              className={`${styles.tabButton} ${
                activeTab === "profile" ? styles.activeTab : ""
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => {
                setActiveTab("password");
                setError("");
                setSuccess("");
              }}
              className={`${styles.tabButton} ${
                activeTab === "password" ? styles.activeTab : ""
              }`}
            >
              Change Password
            </button>
          </div>

          <div className={styles.tabContent}>
            {error && (
              <div className={styles.errorMessage}>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className={styles.successMessage}>
                <p>{success}</p>
              </div>
            )}

            {activeTab === "profile" ? (
              <form onSubmit={handleProfileUpdate} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className={styles.inputField}
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={styles.inputField}
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className={styles.submitButton}
                  >
                    {profileLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePasswordChange} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="currentPassword" className={styles.label}>
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    required
                    className={styles.inputField}
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="newPassword" className={styles.label}>
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    minLength={6}
                    className={styles.inputField}
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  <p className={styles.helperText}>
                    At least 6 characters required
                  </p>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    className={styles.inputField}
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className={styles.submitButton}
                  >
                    {profileLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
