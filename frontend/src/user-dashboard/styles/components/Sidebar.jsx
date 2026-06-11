import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CircleHelp,
  Heart,
  Home,
  LogOut,
  MapPin,
  Settings,
  Ticket,
  User,
  WalletCards,
  Bell,
  MessageSquare,
  FilePlus,
} from "lucide-react";

import "../dashboard.css";

const menuItems = [
  { label: "Client Dashboard", icon: Home, path: "/client/dashboard" },
  { label: "Browse Events", icon: CalendarDays, path: "/client/browse-events" },
  { label: "Browse Venues", icon: MapPin, path: "/client/browse-venues" },
  { label: "My Bookings", icon: Ticket, path: "/client/my-bookings" },
  { label: "Wishlist", icon: Heart, path: "/client/wishlist" },
  { label: "Payments", icon: WalletCards, path: "/client/payments" },
  { label: "Notification", icon: Bell, path: "/client/notification" },
  { label: "Feedback", icon: MessageSquare, path: "/client/feedback" },
  { label: "Event Request", icon: FilePlus, path: "/client/event-request" },
  { label: "Profile", icon: User, path: "/client/profile" },
  { label: "Settings", icon: Settings, path: "/client/settings" },
  { label: "Help & Support", icon: CircleHelp, path: "/client/help-support" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="logo-section">
          <div>
            <h2>EMS</h2>
            <p>Client Module</p>
          </div>

          <button type="button" aria-label="Close sidebar" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 18, fontWeight: 'bold' }}>×</span>
          </button>
        </div>

        <ul className="menu">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <li
              className={location.pathname === path ? "active" : ""}
              key={label}
              onClick={() => navigate(path)}
            >
              <Icon size={18} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="logout" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
