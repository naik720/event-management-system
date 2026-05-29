import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Grid2X2,
  HelpCircle,
  Home,
  LogOut,
  MapPinned,
  PlusCircle,
  ReceiptText,
  Settings,
  Ticket,
  Users,
} from "lucide-react";

const mainItems = [
  { label: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { label: "Client Management", icon: Users, path: "/client/dashboard" },
  { label: "Venue Management", icon: MapPinned, path: "/venue/dashboard", active: true },
];

const venueItems = [
  { label: "All Venues", icon: Grid2X2, path: "/venue/all" },
  { label: "Add New Venue", icon: PlusCircle, path: "/venue/add" },
  { label: "Venue Bookings", icon: Ticket, path: "/venue/bookings" },
  { label: "Seating Arrangements", icon: Grid2X2, path: "/venue/seating" },
  { label: "Maintenance Records", icon: ReceiptText, path: "/venue/maintenance" },
];

const lowerItems = [
  { label: "Event Management", icon: CalendarDays },
  { label: "Bookings", icon: Ticket },
  { label: "Payments", icon: CreditCard },
  { label: "Reports", icon: ReceiptText },
  { label: "Notifications", icon: Bell, badge: "4" },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: HelpCircle },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="venue-sidebar">
      <div>
        <div className="venue-brand">
          <h2>EMS</h2>
          <p>Event Management System</p>
        </div>

        <nav className="venue-menu" aria-label="Venue navigation">
          {mainItems.map(({ label, icon: Icon, path, active }) => (
            <button
              type="button"
              key={label}
              className={active || location.pathname === path ? "active" : ""}
              onClick={() => navigate(path)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}

          <div className="venue-submenu">
            {venueItems.map(({ label, icon: Icon, path }) => (
              <button
                type="button"
                key={label}
                className={location.pathname === path ? "selected" : ""}
                onClick={() => navigate(path)}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {lowerItems.map(({ label, icon: Icon, badge }) => (
            <button type="button" key={label}>
              <Icon size={17} />
              <span>{label}</span>
              {badge && <em>{badge}</em>}
            </button>
          ))}
        </nav>
      </div>

      <button type="button" className="venue-logout">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
