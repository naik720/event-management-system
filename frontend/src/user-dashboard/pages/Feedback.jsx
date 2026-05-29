import React, { useState } from "react";
import { MessageSquare, Send, Star, Ticket } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";
import "../styles/dashboard.css";

const feedbackRecords = [
  {
    event: "Team Awards Night",
    bookingId: "BK-2026-009",
    status: "Pending",
    rating: "Not submitted",
  },
  {
    event: "Design Workshop",
    bookingId: "BK-2026-003",
    status: "Submitted",
    rating: "5/5",
  },
  {
    event: "Food Festival 2026",
    bookingId: "BK-2026-004",
    status: "Resolved",
    rating: "4/5",
  },
];

const Feedback = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Feedback submitted and linked with your booking history.");
    event.currentTarget.reset();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content client-module-content">
        <section className="profile-title-bar">
          <div>
            <h1>Client Feedback</h1>
            <p>Client Dashboard &gt; Feedback Status</p>
          </div>
          <span className="module-status-pill">Event completed workflow</span>
        </section>

        <section className="client-detail-strip">
          <article>
            <p>Client Name</p>
            <strong>{clientName}</strong>
          </article>
          <article>
            <p>Contact Information</p>
            <strong>{currentClient.email || currentClient.phone || "Not added"}</strong>
          </article>
          <article>
            <p>Booking History</p>
            <strong>3 feedback-linked records</strong>
          </article>
          <article>
            <p>Feedback Status</p>
            <strong>1 pending</strong>
          </article>
        </section>

        <div className="client-management-grid">
          <section className="profile-panel">
            <h2>Submit Feedback</h2>
            {message && <p className="profile-save-message">{message}</p>}
            <form className="profile-form-grid" onSubmit={handleSubmit}>
              <label className="profile-field">
                <span>Booking ID</span>
                <div>
                  <Ticket size={15} />
                  <input name="bookingId" placeholder="BK-2026-001" required />
                </div>
              </label>

              <label className="profile-field">
                <span>Rating</span>
                <div>
                  <Star size={15} />
                  <select name="rating" required defaultValue="">
                    <option value="" disabled>Select rating</option>
                    <option>5 - Excellent</option>
                    <option>4 - Good</option>
                    <option>3 - Average</option>
                    <option>2 - Needs improvement</option>
                    <option>1 - Poor</option>
                  </select>
                </div>
              </label>

              <label className="profile-field profile-field-wide">
                <span>Feedback</span>
                <textarea name="feedback" placeholder="Share your event experience" required />
              </label>

              <button type="submit" className="profile-edit-button">
                <Send size={16} />
                Submit Feedback
              </button>
            </form>
          </section>

          <aside className="profile-panel">
            <h2>Feedback Management</h2>
            <div className="module-record-list">
              {feedbackRecords.map((record) => (
                <article key={record.bookingId}>
                  <span>{record.status}</span>
                  <strong>{record.event}</strong>
                  <p>{record.bookingId}</p>
                  <p>
                    <MessageSquare size={13} />
                    {record.rating}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
