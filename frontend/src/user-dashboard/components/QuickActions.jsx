import React from "react";
import { CalendarDays, ChevronRight, Heart, Ticket, WalletCards } from "lucide-react";

const actions = [
  { label: "Browse Events", icon: CalendarDays },
  { label: "My Bookings", icon: Ticket },
  { label: "Saved Events", icon: Heart },
  { label: "Payments", icon: WalletCards },
];

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>

      <div className="quick-action-list">
        {actions.map(({ label, icon: Icon }) => (
          <button key={label} type="button">
            <span>
              <Icon size={18} />
              {label}
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
