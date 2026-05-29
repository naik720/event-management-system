import React from "react";
import { Eye } from "lucide-react";

const records = [
  ["Royal Banquet Hall", "AC system maintenance", "May 25, 2026", "Completed"],
  ["City Auditorium", "Lighting system repair", "May 22, 2026", "Completed"],
  ["Sunset Outdoor Venue", "Garden and seating area cleaning", "May 20, 2026", "Completed"],
  ["Grand Conference Center", "Projector and sound system check", "May 16, 2026", "In Progress"],
  ["Dream Wedding Hall", "Decor and interior maintenance", "May 15, 2026", "Completed"],
];

const MaintenanceTable = () => {
  return (
    <section className="venue-card maintenance-table-card">
      <div className="venue-card-header">
        <h2>Recent Maintenance Records</h2>
        <button type="button">View All</button>
      </div>

      <div className="maintenance-table">
        <div className="maintenance-row maintenance-head">
          <span>Venue Name</span>
          <span>Issue Description</span>
          <span>Maintenance Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {records.map(([venue, issue, date, status]) => (
          <div className="maintenance-row" key={`${venue}-${issue}`}>
            <span>{venue}</span>
            <span>{issue}</span>
            <span>{date}</span>
            <span className={status === "Completed" ? "complete-pill" : "progress-pill"}>{status}</span>
            <span>
              <button type="button" aria-label={`View ${venue} maintenance`}>
                <Eye size={13} />
              </button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MaintenanceTable;
