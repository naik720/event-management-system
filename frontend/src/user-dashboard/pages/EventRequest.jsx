import React, { useMemo, useState } from "react";
import { CalendarDays, ClipboardList, MapPin, Send, UserRoundCheck } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";
import "../styles/dashboard.css";

const requestHistory = [
  {
    id: "REQ-2046",
    title: "Annual Product Meetup",
    date: "Jun 28, 2026",
    location: "Conference Hall A",
    status: "Under Review",
  },
  {
    id: "REQ-2038",
    title: "Private Celebration",
    date: "May 18, 2026",
    location: "Riverside Lawn",
    status: "Booking Confirmed",
  },
  {
    id: "REQ-2029",
    title: "Team Awards Night",
    date: "Apr 30, 2026",
    location: "Grand Ballroom",
    status: "Event Completed",
  },
];

const EventRequest = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const [formData, setFormData] = useState({
    title: "",
    eventType: "Corporate",
    date: "",
    guests: "",
    location: "",
    notes: "",
  });
  const [message, setMessage] = useState("");

  const clientDetails = useMemo(
    () => [
      { label: "Client Name", value: clientName },
      { label: "Contact Information", value: currentClient.email || currentClient.phone || "Not added" },
      { label: "Address", value: currentClient.address || "Not added" },
      { label: "Booking History", value: "3 records" },
    ],
    [clientName, currentClient]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Event request submitted. Booking team will review and confirm availability.");
    setFormData({
      title: "",
      eventType: "Corporate",
      date: "",
      guests: "",
      location: "",
      notes: "",
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content client-module-content">
        <section className="profile-title-bar">
          <div>
            <h1>Event Requests</h1>
            <p>Client Dashboard &gt; Event Request</p>
          </div>
          <span className="module-status-pill">Client workflow step 2</span>
        </section>

        <section className="client-detail-strip">
          {clientDetails.map(({ label, value }) => (
            <article key={label}>
              <p>{label}</p>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <div className="client-management-grid">
          <section className="profile-panel">
            <h2>Submit Event Request</h2>
            {message && <p className="profile-save-message">{message}</p>}

            <form className="profile-form-grid" onSubmit={handleSubmit}>
              <label className="profile-field">
                <span>Event Name</span>
                <div>
                  <ClipboardList size={15} />
                  <input name="title" value={formData.title} onChange={handleChange} required />
                </div>
              </label>

              <label className="profile-field">
                <span>Event Type</span>
                <div>
                  <UserRoundCheck size={15} />
                  <select name="eventType" value={formData.eventType} onChange={handleChange}>
                    <option>Corporate</option>
                    <option>Wedding</option>
                    <option>Conference</option>
                    <option>Private Party</option>
                    <option>Workshop</option>
                  </select>
                </div>
              </label>

              <label className="profile-field">
                <span>Preferred Date</span>
                <div>
                  <CalendarDays size={15} />
                  <input name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
              </label>

              <label className="profile-field">
                <span>Expected Guests</span>
                <div>
                  <UserRoundCheck size={15} />
                  <input name="guests" type="number" min="1" value={formData.guests} onChange={handleChange} required />
                </div>
              </label>

              <label className="profile-field profile-field-wide">
                <span>Venue / Address</span>
                <div>
                  <MapPin size={15} />
                  <input name="location" value={formData.location} onChange={handleChange} required />
                </div>
              </label>

              <label className="profile-field profile-field-wide">
                <span>Request Notes</span>
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Catering, decoration, seating, or special requirements" />
              </label>

              <button type="submit" className="profile-edit-button">
                <Send size={16} />
                Submit Request
              </button>
            </form>
          </section>

          <aside className="profile-panel">
            <h2>Request & Booking History</h2>
            <div className="module-record-list">
              {requestHistory.map((request) => (
                <article key={request.id}>
                  <span>{request.status}</span>
                  <strong>{request.title}</strong>
                  <p>{request.id} · {request.date}</p>
                  <p>{request.location}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EventRequest;
