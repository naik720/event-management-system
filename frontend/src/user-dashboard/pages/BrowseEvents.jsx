import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../styles/components/Sidebar";
import "../styles/dashboard.css";
import "./BrowseEvents.css";

const eventData = [
  {
    id: 1,
    title: "Wedding Celebration",
    description: "Complete wedding planning package",
    location: "Udupi",
    guests: 500,
    price: "₹2,00,000",
    rating: "4.8/5",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
  },
  {
    id: 2,
    title: "Birthday Party",
    description: "Fun and memorable birthday celebrations",
    location: "Udupi",
    guests: 100,
    price: "₹50,000",
    rating: "4.6/5",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
  },
  {
    id: 3,
    title: "Corporate Event",
    description: "Professional events for your business",
    location: "Udupi",
    guests: 300,
    price: "₹1,50,000",
    rating: "4.7/5",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  },
  {
    id: 4,
    title: "Conference",
    description: "Conferences and seminars",
    location: "Udupi",
    guests: 1000,
    price: "₹1,00,000",
    rating: "4.5/5",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  },
  {
    id: 5,
    title: "Concert",
    description: "Live concerts and music events",
    location: "Udupi",
    guests: 2000,
    price: "₹3,00,000",
    rating: "4.9/5",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
  },
  {
    id: 6,
    title: "Exhibition",
    description: "Exhibitions and trade shows",
    location: "Udupi",
    guests: 500,
    price: "₹75,000",
    rating: "4.4/5",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
  },
];

const typeOptions = ["All", "Wedding", "Birthday", "Corporate", "Conference", "Concert", "Exhibition"];
const budgetOptions = ["All", "Below ₹50,000", "₹50,000 - ₹1,00,000", "Above ₹1,00,000"];

const parsePrice = (price) => Number(price.replace(/[₹,]/g, ""));

export default function BrowseEvents() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const navigate = useNavigate();

  const filteredEvents = eventData.filter((event) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm);

    const matchesType =
      typeFilter === "All" || event.title.toLowerCase().includes(typeFilter.toLowerCase());

    const price = parsePrice(event.price);
    const matchesBudget =
      budgetFilter === "All" ||
      (budgetFilter === "Below ₹50,000" && price < 50000) ||
      (budgetFilter === "₹50,000 - ₹1,00,000" && price >= 50000 && price <= 100000) ||
      (budgetFilter === "Above ₹1,00,000" && price > 100000);

    return matchesSearch && matchesType && matchesBudget;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="browse-topbar">
          <div>
            <h1>Browse Events</h1>
            <p>Client Dashboard &gt; Browse Events</p>
          </div>
        </header>

        <section className="browse-page">
          <div className="browse-header">
            <div>
              <h2>Find the perfect event package for your special occasion.</h2>
            </div>

            <div className="browse-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)}>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="event-grid">
            {filteredEvents.map((event) => (
              <div className="event-card" key={event.id}>
                <img src={event.image} alt={event.title} />
                <div className="event-card-body">
                  <div className="event-card-header">
                    <div>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                    <span className="rating">{event.rating}</span>
                  </div>

                  <div className="event-details">
                    <div className="event-info-row">📍 {event.location}</div>
                    <div className="event-info-row">👥 Up to {event.guests} Guests</div>
                    <div className="event-info-row">💰 Starting at {event.price}</div>
                  </div>

                  <div className="event-card-actions">
                    <button className="btn details-btn" onClick={() => navigate("/client/event-request")}>Request Booking</button>
                    <button
                      className="btn request-btn"
                      onClick={() => navigate(`/user/event-details/${event.id}`, { state: { event } })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
