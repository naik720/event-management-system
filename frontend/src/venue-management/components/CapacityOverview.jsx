import React from "react";

const capacities = [
  { name: "Royal Banquet Hall", value: "800 / 800", percent: 100, color: "#7c3aed" },
  { name: "Grand Conference Center", value: "240 / 300", percent: 80, color: "#3b82f6" },
  { name: "Sunset Outdoor Venue", value: "350 / 500", percent: 70, color: "#22c55e" },
  { name: "City Auditorium", value: "900 / 1200", percent: 75, color: "#f97316" },
  { name: "Dream Wedding Hall", value: "450 / 600", percent: 75, color: "#fb7185" },
];

const CapacityOverview = () => {
  return (
    <section className="venue-card capacity-card">
      <div className="venue-card-header">
        <h2>Capacity Overview</h2>
        <button type="button">View All</button>
      </div>

      <div className="capacity-list">
        {capacities.map((item) => (
          <article key={item.name}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.value}</span>
            </div>
            <div className="capacity-track">
              <span style={{ width: `${item.percent}%`, background: item.color }}></span>
            </div>
            <em>{item.percent}%</em>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CapacityOverview;
