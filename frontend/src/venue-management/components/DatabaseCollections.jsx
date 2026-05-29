import React from "react";
import { Armchair, CalendarCheck2, Database } from "lucide-react";

const collections = [
  {
    name: "venues",
    text: "Venue name, type, capacity, location, availability",
    icon: Database,
  },
  {
    name: "venue_bookings",
    text: "Booked venues, dates, event allocation, status",
    icon: CalendarCheck2,
  },
  {
    name: "seating_arrangements",
    text: "Layouts, seating capacity, section allocation",
    icon: Armchair,
  },
];

const DatabaseCollections = () => {
  return (
    <section className="venue-card database-card">
      <div className="venue-card-header">
        <h2>Database Collections</h2>
        <button type="button">View All</button>
      </div>
      <div className="database-list">
        {collections.map(({ name, text, icon: Icon }) => (
          <article key={name}>
            <Icon size={18} />
            <div>
              <strong>{name}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DatabaseCollections;
