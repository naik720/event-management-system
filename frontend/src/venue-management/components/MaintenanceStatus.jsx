import React from "react";
import { AlertTriangle, CheckCircle2, Wrench } from "lucide-react";

const statuses = [
  { label: "Good Condition", value: 15, icon: CheckCircle2, tone: "green" },
  { label: "Maintenance Required", value: 7, icon: AlertTriangle, tone: "orange" },
  { label: "Under Maintenance", value: 3, icon: Wrench, tone: "red" },
];

const MaintenanceStatus = () => {
  return (
    <section className="venue-card maintenance-status-card">
      <div className="venue-card-header">
        <h2>Maintenance Status</h2>
        <button type="button">View All</button>
      </div>

      <div className="maintenance-status-list">
        {statuses.map(({ label, value, icon: Icon, tone }) => (
          <article className={`maintenance-status maintenance-${tone}`} key={label}>
            <span>
              <Icon size={18} />
            </span>
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MaintenanceStatus;
