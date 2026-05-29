import React from "react";
import { Building2, CalendarCheck2, ShieldAlert, TicketCheck, UsersRound } from "lucide-react";

const stats = [
  { label: "Total Venues", value: "25", change: "+12% from last month", icon: Building2, tone: "purple" },
  { label: "Available Venues", value: "12", change: "+8% from last month", icon: CalendarCheck2, tone: "green" },
  { label: "Booked Venues", value: "10", change: "+15% from last month", icon: TicketCheck, tone: "orange" },
  { label: "Under Maintenance", value: "3", change: "+5% from last month", icon: ShieldAlert, tone: "red" },
  { label: "Total Capacity", value: "5,250", change: "+10% from last month", icon: UsersRound, tone: "blue" },
];

const StatsCards = () => {
  return (
    <section className="venue-stats-grid">
      {stats.map(({ label, value, change, icon: Icon, tone }) => (
        <article className={`venue-stat-card venue-${tone}`} key={label}>
          <span>
            <Icon size={26} />
          </span>
          <div>
            <p>{label}</p>
            <h2>{value}</h2>
            <small>{change}</small>
          </div>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
