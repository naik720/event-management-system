import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Heart,
  MapPin,
  Search,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import {
  getClientDisplayName,
  getClientInitial,
  getCurrentClient,
} from "../services/clientSession";
import { getEvents } from "../services/userApi";
import "../styles/dashboard.css";

const fallbackEvents = [
  {
    id: 1,
    title: "Music Concert 2026",
    category: "Music",
    date: "May 25, 2026",
    time: "7:00 PM",
    location: "Auditorium Hall",
    price: 45,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Tech Conference",
    category: "Tech",
    date: "Jun 10, 2026",
    time: "9:00 AM",
    location: "Tech Park, New York",
    price: 99,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Design Workshop",
    category: "Workshop",
    date: "Jun 18, 2026",
    time: "2:00 PM",
    location: "Creative Hub",
    price: 35,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "Food Festival 2026",
    category: "Food & Drink",
    date: "Jun 05, 2026",
    time: "11:00 AM",
    location: "Central Park",
    price: 0,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Art & Culture",
    date: "Jun 12, 2026",
    time: "10:00 AM",
    location: "Art Gallery",
    price: 15,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    title: "Sports Event Live",
    category: "Sports",
    date: "Jun 20, 2026",
    time: "6:00 PM",
    location: "Stadium Arena",
    price: 60,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    title: "Standup Comedy Night",
    category: "Comedy",
    date: "May 30, 2026",
    time: "8:00 PM",
    location: "City Theatre",
    price: 25,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    title: "Online Marketing Webinar",
    category: "Business",
    date: "Jun 15, 2026",
    time: "3:00 PM",
    location: "Online Event",
    price: 0,
    status: "Online",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80",
  },
];

const categoryFilters = [
  "All Categories",
  "Music",
  "Tech",
  "Business",
  "Workshop",
  "Art & Culture",
  "Sports",
  "Food & Drink",
  "Comedy",
  "Others",
];

const eventTypeFilters = [
  { label: "Upcoming", count: 24, checked: true },
  { label: "This Week", count: 8 },
  { label: "This Month", count: 16 },
  { label: "Free Events", count: 5 },
  { label: "Online Events", count: 7 },
];

const BrowseEvents = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const clientInitial = getClientInitial(currentClient);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("earliest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setEvents(fallbackEvents))
      .finally(() => setIsLoading(false));
  }, []);

  const locations = useMemo(
    () => ["All Locations", ...new Set(events.map((event) => event.location))],
    [events]
  );

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const searchText = searchTerm.trim().toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(searchText) ||
          event.category.toLowerCase().includes(searchText) ||
          event.location.toLowerCase().includes(searchText);
        const matchesCategory =
          category === "All Categories" || event.category === category;
        const matchesLocation =
          location === "All Locations" || event.location === location;

        return matchesSearch && matchesCategory && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return new Date(a.date) - new Date(b.date);
      });
  }, [events, searchTerm, category, location, sortBy]);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content browse-content">
        <header className="browse-topbar">
          <div>
            <h1>Browse Events</h1>
            <p>Client Dashboard &gt; Browse Events</p>
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
              placeholder="Search events, categories, or venues..."
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoryFilters.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

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
              <h2>Categories</h2>
              <div className="category-list">
                {categoryFilters.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={category === item ? "selected" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="filter-panel">
              <h2>Event Type</h2>
              <div className="event-type-list">
                {eventTypeFilters.map((item) => (
                  <label key={item.label}>
                    <input type="checkbox" defaultChecked={item.checked} />
                    <span>{item.label}</span>
                    <small>{item.count}</small>
                  </label>
                ))}
              </div>
            </section>
          </aside>

          <section className="events-results">
            <div className="results-header">
              <p>{isLoading ? "Loading events..." : `${filteredEvents.length} Events Found`}</p>

              <label>
                Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="earliest">Date (Earliest)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </label>
            </div>

            <div className="browse-event-grid">
              {filteredEvents.map((event) => (
                <article className="browse-event-card" key={event.id}>
                  <div className="event-image-wrap">
                    <img src={event.image} alt={event.title} />
                    <span className={event.status === "Online" ? "status-badge online" : "status-badge"}>
                      {event.status}
                    </span>
                    <button type="button" aria-label={`Save ${event.title}`}>
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="browse-event-body">
                    <h3>{event.title}</h3>

                    <div className="browse-event-meta">
                      <span>
                        <CalendarDays size={14} />
                        {event.date}
                      </span>
                      <span>
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span>
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>

                    <div className="event-card-footer">
                      <span className="category-pill">{event.category}</span>
                      <strong>{event.price === 0 ? "Free" : `$${event.price}`}</strong>
                    </div>

                    <button type="button" className="details-button">
                      View Details
                    </button>
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

export default BrowseEvents;
