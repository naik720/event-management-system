import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Eye,
  KeyRound,
  Lock,
  Mail,
  Menu,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const getCurrentUser = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "null");
  return { ...registeredUser, ...loggedInUser };
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [mode, setMode] = useState("password");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: currentUser.email || "",
    otp: "",
  });
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const displayName = currentUser.username || currentUser.name || "John Doe";
  const firstName = displayName.split(" ")[0] || "John";
  const profilePhoto =
    currentUser.photo ||
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setError("");
    setMessage("");
  };

  const saveNewPassword = (newPassword) => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "null");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    const updatedRegisteredUser = { ...registeredUser, password: newPassword };
    const updatedLoggedInUser = { ...registeredUser, ...loggedInUser, password: newPassword };

    localStorage.setItem("registeredUser", JSON.stringify(updatedRegisteredUser));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (formData.currentPassword !== currentUser.password) {
      setError("Current password is incorrect.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    saveNewPassword(formData.newPassword);
    setFormData((currentData) => ({
      ...currentData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setMessage("Password changed successfully.");
  };

  const sendOtp = () => {
    if (formData.email.trim().toLowerCase() !== currentUser.email) {
      setError("Please enter your registered email address.");
      return;
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setMessage(`OTP sent to ${formData.email}. Demo OTP: ${otp}`);
  };

  const handleForgotSubmit = (event) => {
    event.preventDefault();

    if (!generatedOtp) {
      setError("Please send OTP first.");
      return;
    }

    if (formData.otp !== generatedOtp) {
      setError("Invalid OTP.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    saveNewPassword(formData.newPassword);
    setGeneratedOtp("");
    setFormData((currentData) => ({
      ...currentData,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setMessage("Password reset successfully. You can use the new password now.");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content profile-content">
        <header className="profile-topbar">
          <div className="profile-search-row">
            <button type="button" className="icon-only" aria-label="Open menu">
              <Menu size={18} />
            </button>

            <div className="booking-search profile-search">
              <Search size={17} />
              <input type="search" placeholder="Search events, bookings..." />
            </div>
          </div>

          <div className="booking-header-actions">
            <button type="button" className="icon-only notification-button" aria-label="Notifications">
              <Bell size={18} />
              <span>3</span>
            </button>
            <button type="button" className="icon-only" aria-label="Settings">
              <Settings size={18} />
            </button>
            <div className="profile-mini-user">
              <img src={profilePhoto} alt={displayName} />
              <div>
                <p>Welcome back,</p>
                <strong>{firstName}!</strong>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <section className="profile-title-bar">
          <div>
            <h1>Change Password</h1>
            <p>Dashboard &gt; Profile &gt; Change Password</p>
          </div>
          <button type="button" className="profile-edit-button" onClick={() => navigate("/user/profile")}>
            Back to Profile
          </button>
        </section>

        <section className="password-page-grid">
          <article className="profile-panel password-panel">
            <div className="password-mode-tabs">
              <button
                type="button"
                className={mode === "password" ? "active" : ""}
                onClick={() => setMode("password")}
              >
                <Lock size={16} />
                Change Password
              </button>
              <button
                type="button"
                className={mode === "forgot" ? "active" : ""}
                onClick={() => setMode("forgot")}
              >
                <Mail size={16} />
                Forgot Password
              </button>
            </div>

            {message && <p className="profile-save-message">{message}</p>}
            {error && <p className="profile-error-message">{error}</p>}

            {mode === "password" ? (
              <form className="password-form" onSubmit={handlePasswordSubmit}>
                <label className="profile-field">
                  <span>Current Password</span>
                  <div>
                    <Eye size={15} />
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label className="profile-field">
                  <span>New Password</span>
                  <div>
                    <KeyRound size={15} />
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label className="profile-field">
                  <span>Confirm New Password</span>
                  <div>
                    <ShieldCheck size={15} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <button type="submit" className="profile-edit-button">
                  Update Password
                </button>
              </form>
            ) : (
              <form className="password-form" onSubmit={handleForgotSubmit}>
                <label className="profile-field">
                  <span>Registered Email</span>
                  <div>
                    <Mail size={15} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <button type="button" className="outline-action password-otp-button" onClick={sendOtp}>
                  Send OTP
                </button>

                <label className="profile-field">
                  <span>Enter OTP</span>
                  <div>
                    <KeyRound size={15} />
                    <input
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="6 digit OTP"
                      required
                    />
                  </div>
                </label>

                <label className="profile-field">
                  <span>New Password</span>
                  <div>
                    <Lock size={15} />
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label className="profile-field">
                  <span>Confirm New Password</span>
                  <div>
                    <ShieldCheck size={15} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <button type="submit" className="profile-edit-button">
                  Reset Password
                </button>
              </form>
            )}
          </article>
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
