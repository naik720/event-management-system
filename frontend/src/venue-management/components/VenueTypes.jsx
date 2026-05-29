import React from "react";
import { Building2, Castle, Landmark, MicVocal, UsersRound } from "lucide-react";

const types = [
  { label: "Banquet Hall", count: "8 Venues", icon: Castle, tone: "purple" },
  { label: "Conference Hall", count: "6 Venues", icon: Landmark, tone: "blue" },
  { label: "Outdoor Venue", count: "5 Venues", icon: Building2, tone: "green" },
  { label: "Auditorium", count: "3 Venues", icon: MicVocal, tone: "orange" },
  { label: "Wedding Hall", count: "3 Venues", icon: UsersRound, tone: "red" },
];

const VenueTypes = () => {
  return (
    <section className="venue-card venue-types-card">
      <div className="venue-card-header">
        <h2>Venue Types</h2>
        <button type="button">View All</button>
      </div>

      <div className="venue-type-grid">
        {types.map(({ label, count, icon: Icon, tone }) => (
          <article className={`venue-type venue-type-${tone}`} key={label}>
            <Icon size={28} />
            <strong>{label}</strong>
            <p>{count}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default VenueTypes;
