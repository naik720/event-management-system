import React, { useState } from "react";
import { Bell, CalendarDays, CheckCircle2, CreditCard, MessageSquare } from "lucide-react";

import Sidebar from "../styles/components/Sidebar";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";
import "../styles/dashboard.css";

const notifications = [
  {
    title: "Booking confirmed",
    text: "Music Concert 2026 is confirmed and added to your booking history.",
    time: "Today, 10:30 AM",
    type: "Booking",
    icon: CheckCircle2,
  },
  {
    title: "Payment receipt generated",
    text: "Receipt PAY-1028 for $320.00 is available in payment records.",
    time: "Yesterday, 5:45 PM",
    type: "Payment",
    icon: CreditCard,
  },
  {
    title: "Event reminder",
    text: "Design Workshop starts on Jun 18, 2026 at Creative Hub.",
    time: "May 27, 2026",
    type: "Event",
    icon: CalendarDays,
  },
  {
    title: "Feedback pending",
    text: "Share feedback for Team Awards Night to complete the client workflow.",
    time: "May 25, 2026",
    type: "Feedback",
    icon: MessageSquare,
  },
];

const defaultPreferences = [
  { title: "Booking updates", enabled: true },
  { title: "Payment records", enabled: true },
  { title: "Event reminders", enabled: true },
  { title: "Feedback requests", enabled: true },
];

const Notification = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const [preferences, setPreferences] = useState(defaultPreferences);

  const togglePreference = (title) => {
    setPreferences((currentPreferences) =>
      currentPreferences.map((preference) =>
        preference.title === title
          ? { ...preference, enabled: !preference.enabled }
          : preference
      )
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content client-module-content">
        <section className="profile-title-bar">
          <div>
            <h1>Event Notifications</h1>
            <p>Personalized notifications for {clientName}</p>
          </div>
          <span className="module-status-pill">6 active alerts</span>
        </section>

        <section className="client-detail-strip">
          <article>
            <p>Client Name</p>
            <strong>{clientName}</strong>
          </article>
          <article>
            <p>Contact Information</p>
            <strong>{currentClient.email || "Not added"}</strong>
          </article>
          <article>
            <p>Booked Events</p>
            <strong>4 upcoming</strong>
          </article>
          <article>
            <p>Feedback Status</p>
            <strong>2 pending</strong>
          </article>
        </section>

        <section className="profile-panel">
          <h2>Notification Center</h2>
          <div className="notification-list">
            {notifications.map(({ title, text, time, type, icon: Icon }) => (
              <article key={title}>
                <span>
                  <Icon size={20} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                  <small>{time}</small>
                </div>
                <em>{type}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3>Personalized Notification Preferences</h3>
              <p>Choose how client booking, payment, request, and feedback updates are delivered.</p>
            </div>
          </div>
          <div className="settings-notification-grid">
            {preferences.map(({ title, enabled }) => (
              <div className="settings-notification-item" key={title}>
                <span>
                  <Bell size={18} />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{enabled ? "Enabled" : "Disabled"} for client module alerts.</p>
                </div>
                <button
                  type="button"
                  className={enabled ? "switch is-on" : "switch"}
                  onClick={() => togglePreference(title)}
                  aria-label={`Toggle ${title}`}
                  aria-pressed={enabled}
                >
                  <span></span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Notification;
