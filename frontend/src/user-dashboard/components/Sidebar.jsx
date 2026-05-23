import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CircleHelp,
  Heart,
  Home,
  LogOut,
  Settings,
  Ticket,
  User,
  WalletCards,
  X,
} from "lucide-react";

import "../styles/dashboard.css";

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/user/dashboard" },
  { label: "Browse Events", icon: CalendarDays, path: "/user/browse-events" },
  { label: "My Bookings", icon: Ticket, path: "/user/my-bookings" },
  { label: "Wishlist", icon: Heart, path: "/user/wishlist" },
  { label: "Payments", icon: WalletCards, path: "/user/payments" },
  { label: "Profile", icon: User, path: "/user/profile" },
  { label: "Settings", icon: Settings, path: "/user/settings" },
  { label: "Help & Support", icon: CircleHelp, path: "/user/help-support" },
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
      <div>
        <div className="logo-section">
          <div>
            <h2>EMS</h2>
            <p>Event Management</p>
          </div>

          <button type="button" aria-label="Close sidebar">
            <X size={18} />
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
