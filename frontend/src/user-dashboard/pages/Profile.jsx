import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Edit3,
  Gift,
  Globe2,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const profileStats = [
  { label: "Total Bookings", value: "12", icon: CalendarDays, tone: "blue" },
  { label: "Completed Events", value: "8", icon: CreditCard, tone: "green" },
  { label: "Pending Requests", value: "3", icon: BriefcaseBusiness, tone: "orange" },
  { label: "Total Payments", value: "$2,450", icon: CircleDollarSign, tone: "purple" },
  { label: "Feedback Given", value: "5", icon: Star, tone: "red" },
  { label: "Upcoming Events", value: "2", icon: Gift, tone: "yellow" },
];

const defaultProfile = {
  username: "John Doe",
  email: "john.doe@gmail.com",
  phone: "+1 987 654 3210",
  dateOfBirth: "15 May 1990",
  address: "123 Main Street, New York, NY 10001, USA",
  city: "New York",
  state: "New York",
  zipCode: "10001",
  photo:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
};

const getSavedProfile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "null");
  return { ...defaultProfile, ...registeredUser, ...loggedInUser };
};

const profileFields = [
  { label: "Full Name", name: "username", icon: User },
  { label: "Email Address", name: "email", icon: Mail },
  { label: "Phone Number", name: "phone", icon: Phone },
  { label: "Date of Birth", name: "dateOfBirth", icon: CalendarDays },
  { label: "Address", name: "address", icon: MapPin, wide: true },
  { label: "City", name: "city", icon: BriefcaseBusiness },
  { label: "State", name: "state", icon: BriefcaseBusiness },
  { label: "ZIP Code", name: "zipCode", icon: Lock },
];

const summaryItems = [
  { label: "Account Status", value: "Active", icon: User, badge: true },
  { label: "Member Since", value: "May 2024", icon: CalendarDays },
  { label: "Last Login", value: "May 21, 2026 10:30 AM", icon: Clock3 },
  { label: "Preferred Contact", value: "Email", icon: Mail },
  { label: "Language", value: "English", icon: Globe2 },
];

const tabs = [
  "Personal Information",
  "Security",
  "Payment Methods",
  "Notification Preferences",
];

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(getSavedProfile);
  const [message, setMessage] = useState("");

  const displayName = profile.username || profile.name || "John Doe";
  const firstName = displayName.split(" ")[0] || "John";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setMessage("");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((currentProfile) => ({ ...currentProfile, photo: reader.result }));
      setMessage("Photo selected. Click Update Profile to save it.");
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const updatedProfile = {
      ...profile,
      email: profile.email.trim().toLowerCase(),
      username: profile.username.trim(),
      phone: profile.phone.trim(),
    };
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser") || "null");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    if (registeredUser) {
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({ ...registeredUser, ...updatedProfile })
      );
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...registeredUser, ...loggedInUser, ...updatedProfile })
    );
    setProfile(updatedProfile);
    setMessage("Profile updated successfully.");
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
              <img
                src={profile.photo}
                alt={displayName}
              />
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
            <h1>My Profile</h1>
            <p>Dashboard &gt; Profile</p>
          </div>
          <button type="button" className="profile-edit-button" onClick={saveProfile}>
            <Edit3 size={16} />
            Update Profile
          </button>
        </section>

        <section className="profile-hero-card">
          <div className="profile-identity">
            <div className="profile-photo-wrap">
              <img
                src={profile.photo}
                alt={displayName}
              />
              <button
                type="button"
                aria-label="Change profile photo"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={18} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="profile-photo-input"
                onChange={handlePhotoChange}
              />
            </div>

            <div className="profile-main-info">
              <h2>
                {displayName}
                <ShieldCheck size={18} fill="currentColor" />
              </h2>
              <p>
                <Mail size={15} />
                {profile.email}
              </p>
              <p>
                <Phone size={15} />
                {profile.phone}
              </p>
              <p>
                <MapPin size={15} />
                {profile.address}
              </p>
              <div className="profile-badges">
                <span>Active Member</span>
                <span>Since May 2024</span>
              </div>
            </div>
          </div>

          <div className="profile-stat-list">
            {profileStats.map(({ label, value, icon: Icon, tone }) => (
              <article className={`profile-stat profile-stat-${tone}`} key={label}>
                <span>
                  <Icon size={20} />
                </span>
                <div>
                  <p>{label}</p>
                  <strong>{value}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className="profile-tabs" aria-label="Profile sections">
          {tabs.map((tab, index) => (
            <button type="button" className={index === 0 ? "active" : ""} key={tab}>
              {tab}
            </button>
          ))}
        </nav>

        <div className="profile-page-grid">
          <section className="profile-panel">
            <h2>Personal Information</h2>
            {message && <p className="profile-save-message">{message}</p>}

            <div className="profile-form-grid">
              {profileFields.map(({ label, name, icon: Icon, wide }) => (
                <label className={wide ? "profile-field profile-field-wide" : "profile-field"} key={label}>
                  <span>{label}</span>
                  <div>
                    <Icon size={15} />
                    <input name={name} value={profile[name] || ""} onChange={handleFieldChange} />
                  </div>
                </label>
              ))}
            </div>
          </section>

          <aside className="profile-side-column">
            <section className="profile-panel">
              <h2>Profile Summary</h2>
              <div className="profile-summary-list">
                {summaryItems.map(({ label, value, icon: Icon, badge }) => (
                  <button type="button" key={label}>
                    <span>
                      <Icon size={16} />
                      {label}
                    </span>
                    <strong className={badge ? "summary-active" : ""}>{value}</strong>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </section>

            <section className="profile-panel">
              <h2>Quick Actions</h2>
              <div className="profile-actions">
                <button type="button" onClick={() => navigate("/user/change-password")}>
                  <Lock size={16} />
                  Change Password
                </button>
                <button type="button" onClick={saveProfile}>
                  <CheckCircle2 size={16} />
                  Update Profile
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Profile;
