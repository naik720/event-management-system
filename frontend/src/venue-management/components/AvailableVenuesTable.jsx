import React from "react";
import { Edit, Eye, Trash2 } from "lucide-react";

const venues = [
  {
    name: "Royal Banquet Hall",
    type: "Banquet Hall",
    capacity: 800,
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Grand Conference Center",
    type: "Conference Hall",
    capacity: 300,
    location: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Sunset Outdoor Venue",
    type: "Outdoor Venue",
    capacity: 500,
    location: "Miami, USA",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "City Auditorium",
    type: "Auditorium",
    capacity: 1200,
    location: "Chicago, USA",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Dream Wedding Hall",
    type: "Wedding Hall",
    capacity: 600,
    location: "Dallas, USA",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=160&q=80",
  },
];

const AvailableVenuesTable = () => {
  return (
    <section className="venue-card available-venues">
      <div className="venue-card-header">
        <h2>Available Venues</h2>
        <button type="button">View All</button>
      </div>

      <div className="venue-table">
        <div className="venue-table-row venue-table-head">
          <span>Venue Name</span>
          <span>Type</span>
          <span>Capacity</span>
          <span>Location</span>
          <span>Availability</span>
          <span>Actions</span>
        </div>

        {venues.map((venue) => (
          <div className="venue-table-row" key={venue.name}>
            <span className="venue-name-cell">
              <img src={venue.image} alt={venue.name} />
              {venue.name}
            </span>
            <span>{venue.type}</span>
            <span>{venue.capacity}</span>
            <span>{venue.location}</span>
            <span className="available-pill">Available</span>
            <span className="venue-actions">
              <button type="button" aria-label={`View ${venue.name}`}>
                <Eye size={13} />
              </button>
              <button type="button" aria-label={`Edit ${venue.name}`}>
                <Edit size={13} />
              </button>
              <button type="button" aria-label={`Delete ${venue.name}`}>
                <Trash2 size={13} />
              </button>
            </span>
          </div>
        ))}
      </div>

      <button type="button" className="venue-wide-button">View All Venues</button>
    </section>
  );
};

export default AvailableVenuesTable;
