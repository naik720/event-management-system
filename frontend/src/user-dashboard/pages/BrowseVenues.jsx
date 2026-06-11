import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Search, Filter, Heart, Ticket, ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "../styles/components/Sidebar";
import { getClientDisplayName, getClientInitial, getCurrentClient } from "../services/clientSession";
import { getVenues } from "../services/userApi";
import "../styles/dashboard.css";

const BrowseVenues = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const clientInitial = getClientInitial(currentClient);
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getVenues()
      .then(setVenues)
      .catch(() => setVenues([]))
      .finally(() => setIsLoading(false));
  }, []);

  const locations = useMemo(
    () => ["All Locations", ...new Set(venues.map((venue) => venue.location))],
    [venues]
  );

  const filteredVenues = useMemo(() => {
    const searchText = searchTerm.trim().toLowerCase();

    return venues
      .filter((venue) => {
        const matchesSearch =
          venue.name.toLowerCase().includes(searchText) ||
          venue.type.toLowerCase().includes(searchText) ||
          venue.location.toLowerCase().includes(searchText);

        const matchesLocation =
          location === "All Locations" || venue.location === location;

        return matchesSearch && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
      });
  }, [venues, searchTerm, location, sortBy]);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content browse-content">
        <header className="browse-topbar">
          <div>
            <h1>Browse Venues</h1>
            <p>Client Dashboard &gt; Browse Venues</p>
          </div>

          <div className="profile-box">
            <div>
              <h4>{currentClient.email || "client@example.com"}</h4>
              <p>Welcome back, {clientName}!</p>
            </div>
            <div className="avatar">{clientInitial}</div>
          </div>
        </header>

        <section className="browse-toolbar">
          <div className="search-control">
            <Search size={18} />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search venues, locations, or types..."
            />
          </div>

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button type="button" className="date-button">
            <CalendarDays size={16} />
            Date
          </button>

          <button type="button" className="filter-button">
            <Filter size={16} />
            Filters
          </button>
        </section>

        <div className="browse-layout">
          <aside className="filters-column">
            <section className="filter-panel">
              <h2>Venue Type</h2>
              <div className="category-list">
                {[...new Set(venues.map((venue) => venue.type))].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={""}
                    onClick={() => setSearchTerm(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <section className="events-results">
            <div className="results-header">
              <p>{isLoading ? "Loading venues..." : `${filteredVenues.length} Venues Found`}</p>

              <label>
                Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="latest">Newest</option>
                  <option value="price-low">Price - Low to High</option>
                  <option value="price-high">Price - High to Low</option>
                </select>
              </label>
            </div>

            <div className="browse-event-grid">
              {filteredVenues.map((venue) => (
                <article className="browse-event-card" key={venue._id || venue.id}>
                  <div className="event-image-wrap">
                    <img
                      src={venue.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80"}
                      alt={venue.name}
                    />
                    <span className={venue.status === "Available" ? "status-badge" : "status-badge offline"}>
                      {venue.status || "Available"}
                    </span>
                    <button type="button" aria-label={`Save ${venue.name}`}>
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="browse-event-body">
                    <h3>{venue.name}</h3>

                    <div className="browse-event-meta">
                      <span>
                        <MapPin size={14} />
                        {venue.location}
                      </span>
                      <span>
                        <Ticket size={14} />
                        {venue.capacity} guests
                      </span>
                    </div>

                    <div className="event-card-footer">
                      <span className="category-pill">{venue.type}</span>
                      <strong>{venue.price ? `$${venue.price}` : "Request quote"}</strong>
                    </div>

                    <p className="event-description">{venue.description?.slice(0, 110) || "Comfortable venue with flexible capacity and amenities."}</p>

                    <div className="browse-event-actions">
                      <button type="button" className="details-button" onClick={() => navigate(`/client/event-request`, { state: { venue } })}>
                        Request Booking
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pagination">
              <button type="button">
                <ChevronLeft size={16} />
              </button>
              <button type="button" className="current">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BrowseVenues;
