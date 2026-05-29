import React from "react";
import { Building2, CalendarClock, CalendarDays, ClipboardCheck } from "lucide-react";

const steps = [
  { label: "Venue Added", status: "Completed", icon: Building2, tone: "green" },
  { label: "Availability Checked", status: "Completed", icon: CalendarClock, tone: "blue" },
  { label: "Venue Booked", status: "In Progress", icon: ClipboardCheck, tone: "orange" },
  { label: "Event Scheduled", status: "Pending", icon: CalendarDays, tone: "purple" },
];

const VenueWorkflow = () => {
  return (
    <section className="venue-card workflow-card">
      <h2>Venue Workflow</h2>
      <div className="workflow-track">
        {steps.map(({ label, status, icon: Icon, tone }, index) => (
          <article className={`workflow-item workflow-${tone}`} key={label}>
            <span className="workflow-icon">
              <Icon size={24} />
            </span>
            <em>{index + 1}</em>
            <strong>{label}</strong>
            <small>{status}</small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default VenueWorkflow;
